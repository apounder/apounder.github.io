# Austin Pounder Research Website

Static website hosted on GitHub Pages. Publication content lives in
`assets/data/publications.json`; use [Pages CMS](docs/OWNER_GUIDE.md) to edit it
through a form without changing HTML.

## Files

- Root HTML files contain page markup.
- `assets/css/<page>.css` contains each page's base styles; `site.css` loads after
  them and supplies the shared design and responsive refinements.
- `assets/js/publications.js` renders the archive and homepage publications.
- `assets/data/` stores publications and presentations; images and PDFs stay
  under their existing asset folders.

## Preview and validation

Run `python3 -m http.server 8000`, then open `http://localhost:8000`.
Use HTTP for previews: opening HTML directly cannot fetch the publication JSON.

If editing JSON manually, check its syntax before publishing:

```sh
python3 -m json.tool assets/data/publications.json > /dev/null
```

Browser tests (in a virtual environment):

```sh
pip install -r tests/requirements.txt
python -m playwright install chromium
python -m unittest discover -s tests -v
```

The tests start their own local server and check publication data, search,
filters, images, error recovery, and mobile navigation.
