"""Browser regressions for publication editing, public rendering, and navigation."""
import copy
import functools
import http.server
import json
from pathlib import Path
import threading
import unittest
import yaml
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'assets/data/publications.json').read_text())


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class WebsiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(QuietHandler, directory=str(ROOT))
        cls.server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = f'http://127.0.0.1:{cls.server.server_port}/'
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def setUp(self):
        self.context = self.browser.new_context(viewport={'width': 1440, 'height': 1000}, color_scheme='light')
        # The public third-party scientific data providers are outside these tests.
        self.context.route('https://**/*', lambda route: route.abort())
        self.page = self.context.new_page()
        self.errors = []
        self.page.on('pageerror', lambda error: self.errors.append(str(error)))

    def tearDown(self):
        self.context.close()

    def archive(self):
        self.page.goto(self.base + 'publications.html')
        expect(self.page.locator('#publicationArchive')).to_have_attribute('aria-busy', 'false')

    def mock_data(self, data):
        self.page.route('**/assets/data/publications.json', lambda route: route.fulfill(json=data))

    def test_schema_and_local_images(self):
        config = yaml.safe_load((ROOT / '.pages.yml').read_text())
        form = config['content'][0]
        self.assertEqual(form['path'], 'assets/data/publications.json')
        keys = {f['name'] for f in form['fields'][0]['fields']}
        self.assertEqual(keys, {'title', 'authors', 'year', 'status', 'journal', 'details', 'url', 'image'})
        for record in DATA['publications']:
            self.assertTrue(keys.issuperset(record))
            if record['image']:
                self.assertTrue((ROOT / record['image'].lstrip('/')).is_file())

    def test_filter_search_topics_and_reset(self):
        self.archive()
        count = len(DATA['publications'])
        expect(self.page.locator('.pub-item')).to_have_count(count)
        self.page.locator('[data-filter="published"]').click()
        published = sum(r['status'] == 'published' for r in DATA['publications'])
        expect(self.page.locator('.pub-item:visible')).to_have_count(published)
        self.page.locator('#pubSearch').fill('does-not-match-any-publication-93817')
        expect(self.page.locator('.archive-empty')).to_be_visible()
        expect(self.page.locator('#publicationStatus')).to_contain_text(f'0 of {count}')
        self.page.locator('#clearPublications').click()
        expect(self.page.locator('.pub-item:visible')).to_have_count(count)
        self.page.locator('summary').click()
        topic = self.page.locator('.topic-tag').first
        name = topic.get_attribute('data-topic')
        topic.click()
        expect(topic).to_have_attribute('aria-pressed', 'true')
        expect(self.page.locator('#publicationStatus')).to_contain_text(name)
        self.page.locator('#pubSearch').fill('Pounder')
        self.page.locator('#clearPublications').click()
        expect(self.page.locator('.pub-item:visible')).to_have_count(count)
        self.assertFalse(self.errors, self.errors)

    def test_new_record_updates_both_pages_and_preserves_images(self):
        data = copy.deepcopy(DATA)
        new = dict(title='A newly added owner publication', authors='Pounder, A.; Example, B.', year=2100,
                   status='published', journal='Test journal', details='Accepted', url='https://doi.org/10.1234/example', image='')
        data['publications'].insert(0, new)
        self.mock_data(data)
        self.archive()
        expect(self.page.locator('.pub-title').first).to_have_text(new['title'])
        expected = next(r for r in DATA['publications'] if r['image'])
        item = self.page.locator('.pub-item').filter(has=self.page.get_by_role('heading', name=expected['title'], exact=True))
        self.assertTrue(item.locator('img').get_attribute('src').endswith(expected['image']))
        self.page.goto(self.base + 'index.html')
        expect(self.page.locator('#recentPublications h3').first).to_have_text(new['title'])
        self.assertFalse(self.errors, self.errors)

    def test_unsafe_content_cannot_execute_or_link(self):
        record = copy.deepcopy(DATA['publications'][0])
        record.update(title='<img src=x onerror="window.injected=true">',
                      url='javascript:window.injected=true', image='//attacker.example/payload.svg')
        self.mock_data({'publications': [record]})
        self.archive()
        expect(self.page.locator('.pub-title')).to_have_text(record['title'])
        expect(self.page.locator('.pub-item img, .pub-link, .pub-title a')).to_have_count(0)
        self.assertIsNone(self.page.evaluate('window.injected'))

    def test_load_failure_retry_and_empty_data(self):
        def fail(route):
            route.fulfill(status=503, body='unavailable')
        self.page.route('**/assets/data/publications.json', fail)
        self.archive()
        expect(self.page.get_by_role('heading', name='Publications couldn’t be loaded')).to_be_visible()
        self.page.unroute('**/assets/data/publications.json', fail)
        self.page.get_by_role('button', name='Try again').click()
        expect(self.page.locator('.pub-item')).to_have_count(len(DATA['publications']))
        self.mock_data({'publications': []})
        self.archive()
        expect(self.page.get_by_role('heading', name='Publications are on their way')).to_be_visible()

    def test_mobile_routes_theme_and_reduced_motion(self):
        self.page.set_viewport_size({'width': 390, 'height': 844})
        self.page.emulate_media(reduced_motion='reduce')
        for route in ['index.html', 'research.html', 'publications.html', 'posters.html', 'resources.html']:
            with self.subTest(route=route):
                self.page.goto(self.base + route)
                self.page.evaluate('document.fonts.ready')
                self.assertLessEqual(self.page.evaluate('document.documentElement.scrollWidth'), 390)
                menu = self.page.locator('.menu')
                menu.click()
                expect(menu).to_have_attribute('aria-expanded', 'true')
                expect(self.page.locator('.nav')).to_be_visible()
                self.page.keyboard.press('Escape')
                expect(menu).to_have_attribute('aria-expanded', 'false')
                self.assertTrue(self.page.locator('.reveal').evaluate_all('(es)=>es.every(e=>getComputedStyle(e).opacity === "1")'))
                self.page.locator('.theme-toggle').click()
                expect(self.page.locator('html')).to_have_attribute('data-theme', 'dark')
                self.page.locator('.theme-toggle').click()
                expect(self.page.locator('html')).to_have_attribute('data-theme', 'light')
        self.assertFalse(self.errors, self.errors)


if __name__ == '__main__':
    unittest.main()
