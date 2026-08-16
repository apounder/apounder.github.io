# Austin Pounder Research Website

Static GitHub Pages site for `apounder.github.io`.

## Pages

- `index.html` — About, research overview, interactive molecular viewers, selected publications
- `research.html` — Research programs
- `publications.html` — Publication archive, search, status filters, and topic filters
- `posters.html` — Poster archive
- `resources.html` — Chemistry and computational chemistry resources

## Site assets

The HTML files expect the following existing asset locations:

```text
assets/
├── data/
│   └── presentations.js
├── files/
│   └── Austin_Pounder_CV.pdf
├── images/
│   ├── about/
│   │   └── austin-pounder.jpg
│   └── publications/
│       ├── pub-01.jpg
│       ├── pub-02.jpg
│       └── ...
└── presentations/
    └── *.pdf
```

`posters.html` reads poster metadata from `assets/data/presentations.js`.

Published-paper graphical abstracts are read from
`assets/images/publications/pub-XX.jpg`.

The homepage portrait is read from
`assets/images/about/austin-pounder.jpg`.

## Local preview

From the site root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

The homepage molecular viewers require internet access because 3Dmol.js,
PubChem, and RCSB PDB resources are loaded remotely.

## Deployment

Publish the contents of the site root through GitHub Pages from the
`apounder.github.io` repository.
