# Austin Pounder personal research site — enhanced build

This version extends the teal/copper design with several interactive features inspired by high-quality computational chemistry group websites while keeping the visual identity distinct.

## Added features

### 1. Interactive molecular space
The homepage contains a WebGL 3D molecular viewer powered by **3Dmol.js**. A local list of 192 familiar molecule names cycles automatically. For each molecule, the browser resolves a PubChem CID and retrieves the 3D record on demand. Visitors can:

- drag to rotate and scroll/pinch to zoom;
- pause/resume the automatic carousel;
- move backward/forward through the library;
- switch between ball-and-stick, sticks, and space-filling representations;
- type any molecule name into the search field.

Only one molecule is requested at a time. CID lookups are cached in the visitor's browser using `localStorage`.

**Internet access is required for the 3D viewer**, because 3Dmol.js is loaded from a pinned CDN version and the structure is obtained from PubChem. If either service is unavailable, the designed static molecular fallback remains visible.

### 2. Honeycomb / hexagonal research map
The About/Home and Research pages now use a responsive hexagonal visual map. The illustrations are original inline SVG graphics, so there are no missing-image boxes. Later, individual cells can be changed to photographs or research figures while keeping the same hexagonal clipping.

### 3. Automatic publication tags
The Publications page now infers topic tags automatically from each publication's title, journal, authors, details, and—if present—the optional `data-abstract` attribute.

You do **not** manually assign tags. When a new publication is added in the existing `.pub-item` format, the page classifies it at load time. Current categories include computational chemistry, mechanisms, catalysis, transition metals, selectivity, ML, MD, nucleic acids, photochemistry, fluorine chemistry, spectroscopy/structure, synthetic methodology, strained molecules, and molecular probes.

The tag cloud grows slightly with **frequency across your publication list**. Clicking a tag filters the archive; clicking the same tag again clears the filter. Search and publication-status filters continue to work at the same time.

This is intentionally frequency-based, not a claim of external scientific popularity. A later version could use citation data from OpenAlex if desired.

### 4. Poster topic filters
Poster cards are classified automatically from their titles and can be filtered by mechanisms, nucleic acids/probes, or fluorine chemistry.

## Main files
- `index.html` — About + research overview + honeycomb + interactive molecular-space viewer
- `research.html` — detailed research programs + honeycomb research atlas
- `publications.html` — automatic topic cloud, filters, search, complete publication archive
- `posters.html` — poster archive with topic filters

## Local preview
For the most realistic preview, run from this directory:

```bash
python -m http.server 8000
```

then open `http://localhost:8000`.

The site can still be opened directly from `index.html`, but the PubChem/3Dmol molecular viewer requires an internet connection.

## Publishing
Upload the contents of this directory to the root of the public GitHub repository `apounder.github.io` and enable GitHub Pages from the `main` branch / root directory.


## Interactive structure panels

The homepage loads one random PubChem small molecule and one random PDB structure on each page refresh. They do not auto-cycle. The small molecule is shown ball-and-stick; the PDB entry is shown as a chain-colored cartoon with hetero atoms in ball-and-stick.
