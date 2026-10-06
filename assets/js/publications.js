/* Read-only public renderer. Editing and authentication are handled by Pages CMS
   and GitHub; no write credentials or authentication state live on this site. */
(() => {
  'use strict';
  const archive = document.getElementById('publicationArchive');
  const recent = document.getElementById('recentPublications');
  if (!archive && !recent) return;
  const statuses = ['submitted', 'published'];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  // Treat CMS text as text, never HTML. Only HTTPS article destinations and
  // same-site raster images can become links; javascript/data URLs are rejected.
  const articleURL = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
    } catch { return ''; }
  };
  const imageURL = value => {
    if (typeof value !== 'string' || !/^\/?assets\/images\/publications\/[a-zA-Z0-9_./% -]+\.(png|jpe?g|webp|avif)$/i.test(value)) return '';
    try {
      const url = new URL(value.replace(/^\/+/, ''), document.baseURI);
      const base = new URL('assets/images/publications/', document.baseURI);
      return url.origin === base.origin && url.pathname.startsWith(base.pathname) ? url.href : '';
    } catch { return ''; }
  };
  const link = (className, text, href) => {
    const arrow = text.match(/\s*([↗→])$/);
    const node = el('a', className, arrow ? text.replace(/\s*[↗→]$/, '') : text);
    if (arrow) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'link-icon');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', arrow[1] === '→' ? 'M4 12h16M14 6l6 6-6 6' : 'M5 19 19 5M5 5h14v14');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.append(path);
      node.append(svg);
    }
    node.href = href;
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
    return node;
  };
const TOPIC_RULES=[
  ['Machine learning',/machine[- ]learn|deep learn|neural|graph network|artificial intelligence|\bai\b|predictive model|digital chemistry/gi],
  ['Computational chemistry',/\bdft\b|density functional|computational|theoretical|quantum chem|electronic structure|thermochem|calculation/gi],
  ['Reaction mechanisms',/mechanis|transition state|reaction pathway|rearrangement|cascade|domino|ring-opening|cycloaddition|migration|activation/gi],
  ['Catalysis',/cataly|catalyst|organocatal|photocatal/gi],
  ['Transition metals',/nickel|palladium|rhodium|ruthenium|iridium|cobalt|iron|copper|transition[- ]metal|organometal/gi],
  ['Selectivity',/selectiv|enantio|regioselect|stereo|diastereo|chemoselect|atropo|asymmetric/gi],
  ['Molecular dynamics',/molecular dynamics|\bmd\b|conformational ensemble|simulation criteria|structural convergence/gi],
  ['Nucleic acids',/\b(?:dna|rna|trna|sirna)\b|nucleic acid|nucleobase|aptamer|oligonucleotide/gi],
  ['Photochemistry',/photo|excited state|emission|fluorescen|fluorophore|chromophore|photobasic|solvatochrom/gi],
  ['Fluorine chemistry',/\bfluorin|\b(?:di|tri|tetra|poly)?fluoro(?!genic|phore|metr|esc)|\bdefluor|\bc[-–]?f\b/gi],
  ['Spectroscopy & structure',/spectroscop|nmr|absorption|emission|structural characterization|crystal|xrd|photophys/gi],
  ['Synthetic methodology',/synthesis|arylation|coupling|hydrogenation|deuteration|hydroacylation|lactonization|amination|ring-opening|cycloaddition/gi],
  ['Strained molecules',/bicycl|oxabicycl|norborn|cycloprop|strained/gi],
  ['Molecular probes',/probe|reporter|sensor|diagnostic|fluorogenic|binding thermodynamics/gi]
];  const inferTopics = record => {
    const text = [record.title, record.journal, record.details, record.authors].join(' ');
    const scored = TOPIC_RULES.map(([name, regex]) => [name, (text.match(regex) || []).length]);
    const topics = scored.filter(([, count]) => count).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 4).map(([name]) => name);
    return topics.length ? topics : ['Organic chemistry'];
  };
  const validate = data => {
    if (!data || !Array.isArray(data.publications)) throw new Error('Invalid publication file');
    // Exclude legacy draft records before rendering or counting public results.
    const records = data.publications.filter(record => record?.status !== 'in preparation');
    for (const record of records) {
      if (!record || !['title', 'authors', 'journal'].every(key => typeof record[key] === 'string' && record[key].trim()) ||
          !Number.isInteger(record.year) || record.year < 1900 || record.year > 2200 || !statuses.includes(record.status) ||
          ['details', 'url', 'image'].some(key => record[key] != null && typeof record[key] !== 'string')) {
        throw new Error('Invalid publication record');
      }
    }
    // All submitted manuscripts come first; each status is newest-first. Ties preserve the editor's order.
    return records.sort((a, b) => statuses.indexOf(a.status) - statuses.indexOf(b.status) || b.year - a.year);
  };
  const renderRecent = records => {
    const published = records.filter(record => record.status === 'published').slice(0, 4);
    const feature = document.getElementById('featuredPublication');
    if (feature && published[0]) {
      const record = published[0];
      const article = el('article', 'featured-publication');
      const figure = el('figure', 'featured-science');
      const src = imageURL(record.image);
      if (src) {
        const img = el('img');
        img.src = src;
        img.alt = `Graphical abstract: ${record.title}`;
        img.loading = 'lazy';
        const imageLink = link('graphical-abstract-link', '', src);
        imageLink.setAttribute('aria-label', `Open graphical abstract: ${record.title}`);
        imageLink.append(img);
        figure.append(imageLink);
      }
      const content = el('div', 'featured-copy');
      content.append(el('p', 'editorial-meta', [record.journal, record.details].filter(Boolean).join(' · ')));
      content.append(el('h3', 'featured-title', record.title));
      const url = articleURL(record.url);
      content.append(url ? link('research-evidence-link', 'Read the article ↗', url) : link('research-evidence-link', 'View publication ↗', 'publications.html'));
      article.append(figure, content);
      feature.replaceChildren(article);
    }
    const rows = (feature ? published.slice(1) : published).map(record => {
      const url = articleURL(record.url);
      const row = el('article', 'editorial-row');
      const content = el('div');
      const title = el('h3', 'editorial-title');
      title.append(link('', record.title, url || 'publications.html'));
      content.append(title, el('div', 'editorial-meta', [record.journal, record.details].filter(Boolean).join(' · ')));
      row.append(el('div', 'editorial-year', record.year), content, link('editorial-link', url ? 'Read article ↗' : 'View publication ↗', url || 'publications.html'));
      const image = imageURL(record.image);
      if (image) {
        const imageLink = link('selected-figure-link', '', image);
        imageLink.setAttribute('aria-label', `Open graphical abstract: ${record.title}`);
        const figure = el('img', 'selected-figure');
        figure.alt = `Graphical abstract: ${record.title}`;
        figure.src = image;
        figure.loading = 'lazy';
        figure.addEventListener('error', () => { imageLink.remove(); row.classList.remove('with-figure'); }, { once: true });
        imageLink.append(figure);
        row.append(imageLink);
        row.classList.add('with-figure');
      }
      return row;
    });
    recent.replaceChildren(...(rows.length ? rows : [el('p', '', 'Published articles will appear here.')]));
  };
  const renderArchive = records => {
    const fragment = document.createDocumentFragment();
    const groups = new Map();
    const entries = [];
    const topicCounts = new Map();
    const buttons = [...document.querySelectorAll('.filter')];
    const search = document.getElementById('pubSearch');
    const clear = document.getElementById('clearPublications');
    const status = document.getElementById('publicationStatus');
    const requestedTopic = new URLSearchParams(location.search).get('topic');
    let filter = 'all', topic = TOPIC_RULES.some(([name]) => name === requestedTopic) ? requestedTopic : 'all';
    records.forEach((record, index) => {
      const groupKey = `${record.status}-${record.year}`;
      if (!groups.has(groupKey)) {
        const section = el('section', 'pub-year-block');
        section.dataset.year = record.year;
        const heading = el('h2', 'pub-year', record.year);
        heading.id = record.status === 'published' ? `year-${record.year}` : `year-submitted-${record.year}`;
        section.setAttribute('aria-labelledby', heading.id);
        const items = el('div', 'pub-items');
        section.append(heading, items);
        groups.set(groupKey, { section, items });
        fragment.append(section);
      }
      const item = el('article', 'pub-item');
      item.dataset.status = record.status;
      const main = el('div', 'pub-main');
      const text = el('div', 'pub-text');
      const journal = el('div', 'pub-journal', record.journal);
      if (!record.journal.toLowerCase().includes(record.status)) journal.append(el('span', 'publication-state', record.status));
      const title = el('h3', 'pub-title');
      const url = articleURL(record.url);
      title.append(url ? link('', record.title, url) : document.createTextNode(record.title));
      const authors = el('p', 'pub-authors');
      record.authors.split(/(Pounder,\s*A\.)/g).forEach(part => {
        authors.append(/^Pounder,\s*A\.$/.test(part) ? el('strong', '', part) : document.createTextNode(part));
      });
      text.append(journal, title, authors);
      if (record.details && record.details.toLowerCase() !== record.journal.toLowerCase()) text.append(el('div', 'pub-details', record.details));
      if (url) text.append(link('pub-link', 'Article / DOI ↗', url));
      const topics = inferTopics(record);
      const tags = el('div', 'pub-tags');
      topics.forEach(name => {
        topicCounts.set(name, (topicCounts.get(name) || 0) + 1);
        const tag = el('button', 'pub-topic', name);
        tag.type = 'button';
        tag.dataset.topic = name;
        tag.addEventListener('click', () => { topic = topic === name ? 'all' : name; update(); });
        tags.append(tag);
      });
      text.append(tags);
      main.append(text);
      const image = imageURL(record.image);
      if (image) {
        const imageLink = link('pub-image', '', image);
        imageLink.setAttribute('aria-label', `Open graphical abstract: ${record.title}`);
        const img = el('img');
        img.alt = `Graphical abstract: ${record.title}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.addEventListener('error', () => { imageLink.remove(); main.classList.remove('has-image'); }, { once: true });
        img.src = image;
        imageLink.append(img);
        main.classList.add('has-image');
        main.append(imageLink);
      }
      const number = el('span', 'pub-num', String(records.length - index).padStart(2, '0'));
      number.setAttribute('aria-label', `Publication ${records.length - index}`);
      item.append(main, number);
      groups.get(groupKey).items.append(item);
      entries.push({ item, record, topics, searchable: Object.values(record).join(' ').toLocaleLowerCase() });
    });
    const empty = el('div', 'archive-empty');
    empty.hidden = true;
    empty.append(el('h2', '', 'No matching publications'), el('p', '', 'Try another search, or clear the filters to see all publications.'));
    fragment.append(empty);
    archive.replaceChildren(fragment);
    const cloud = document.getElementById('topicCloud');
    cloud.replaceChildren();
    [...topicCounts].sort((a, b) => b[1] - a[1]).forEach(([name, count]) => {
      const button = el('button', 'topic-tag', name);
      button.type = 'button';
      button.dataset.topic = name;
      button.append(el('span', 'count', count));
      button.addEventListener('click', () => { topic = topic === name ? 'all' : name; update(); });
      cloud.append(button);
    });
    function update() {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      entries.forEach(({ item, record, topics, searchable }) => {
        const match = (filter === 'all' || record.status === filter) && (!query || searchable.includes(query)) && (topic === 'all' || topics.includes(topic));
        item.hidden = !match;
        if (match) visible++;
      });
      groups.forEach(({ section, items }) => { section.hidden = ![...items.children].some(item => !item.hidden); });
      buttons.forEach(button => {
        const active = button.dataset.filter === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('[data-topic]').forEach(button => {
        const active = button.dataset.topic === topic;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      status.textContent = `${visible} of ${records.length} publications${topic !== 'all' ? ' · ' + topic : ''}`;
      clear.hidden = !query && filter === 'all' && topic === 'all';
      empty.hidden = visible > 0;
      if (!records.length) {
        empty.firstElementChild.textContent = 'Publications are on their way';
        empty.lastElementChild.textContent = 'Check back for new research.';
      }
    }
    buttons.forEach(button => { button.onclick = () => { filter = button.dataset.filter; update(); }; });
    search.oninput = update;
    clear.onclick = () => { filter = topic = 'all'; search.value = ''; update(); search.focus(); };
    update();
  };
  const load = async () => {
    if (archive) archive.setAttribute('aria-busy', 'true');
    try {
      let data;
      if ((document.documentElement.hasAttribute('data-offline-review') || location.protocol === 'file:') && window.PUBLICATIONS_OFFLINE) {
        data = window.PUBLICATIONS_OFFLINE;
      } else {
        const response = await fetch('assets/data/publications.json', { cache: 'no-cache', signal: AbortSignal.timeout(12000) });
        if (!response.ok) throw new Error(`Publication request failed: ${response.status}`);
        data = await response.json();
      }
      const records = validate(data);
      if (recent) renderRecent(records);
      if (archive) renderArchive(records);
    } catch {
      if (archive) {
        const error = el('div', 'archive-empty');
        error.append(el('h2', '', 'Publications couldn’t be loaded'), el('p', '', 'Please try again, or browse the publication list on Google Scholar.'));
        const retry = el('button', 'hero-action primary', 'Try again');
        retry.type = 'button';
        retry.onclick = () => { retry.disabled = true; retry.textContent = 'Loading…'; load(); };
        error.append(retry, link('pub-link', 'Google Scholar ↗', 'https://scholar.google.ca/citations?user=NLcTITgAAAAJ&hl=en'));
        archive.replaceChildren(error);
        document.getElementById('publicationStatus').textContent = 'Publication list unavailable';
      }
      // The homepage retains its existing static recent-publication fallback.
    } finally {
      if (archive) archive.setAttribute('aria-busy', 'false');
    }
  };
  load();
})();
