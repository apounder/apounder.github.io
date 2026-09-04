# Austin Pounder Research Website

Source for [apounder.github.io](https://apounder.github.io/), a static academic
portfolio covering research, publications, presentations, and curated chemistry
resources.

## Local preview

No build step is required. From the repository root, start any static file
server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Use a server instead of opening files
directly so local publication fetching and poster PDF checks behave as they do
on GitHub Pages.

## Content map

- `index.html` — profile, research overview, molecular viewers, and recent work
- `research.html` — detailed research areas and methods
- `publications.html` — searchable publication and manuscript archive
- `posters.html` — poster archive generated from `assets/data/presentations.js`
- `resources.html` — curated chemistry software and reference links
- `assets/css/site.css` — shared responsive layout, light/dark themes, and motion styles
- `assets/js/theme-init.js` — pre-paint system and saved-theme initialization
- `assets/js/site.js` — theme control, accessible navigation, filters, and pointer motion

Publication metadata is maintained in `publications.html`. The homepage reads
the newest published records from that page and retains static fallback rows if
the request fails. Poster metadata belongs in `assets/data/presentations.js`;
poster PDFs belong in `assets/presentations/`.

The color-mode control follows the operating-system preference until a visitor
selects light or dark mode. That choice is saved locally in the browser. Pointer
motion is progressively enhanced for precise pointing devices and is disabled
when the visitor requests reduced motion or uses a coarse touch interface.

## Review before publishing

Check the site at desktop and mobile widths, confirm keyboard navigation and
filter behavior, verify local PDFs and images, and inspect every external link.
Do not commit generated visitor analytics, access tokens, or unpublished
research material.
