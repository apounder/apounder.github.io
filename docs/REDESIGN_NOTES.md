# Design audit and implementation

The existing site uses static HTML, page-specific embedded CSS, a shared stylesheet, and vanilla JavaScript. That stack, all five page routes, scientific content, publication DOI links, CV, presentations, resource search, theme selection, and molecule viewers have been retained.

## Findings addressed

- System-font typography and oversized uppercase page headings lacked a consistent editorial hierarchy. Locally hosted DM Sans and Newsreader now provide readable body text and distinct serif display type; font licenses are included.
- The molecular canvas sat behind the primary text, and pointer motion moved the reading surface. The field is now weighted to the right, the text stays stationary, and a deliberate entrance sequence establishes hierarchy.
- Canvas animation ran while scrolled offscreen. It now pauses when outside the viewport, when the document is hidden, and when reduced motion is requested.
- Reveal rules hid content without JavaScript, and navigation/reveal logic was duplicated across pages. A shared controller now manages accessible navigation, Escape/outside-click behavior, and progressive reveal. Reduced motion disables animation.
- Box-within-box research grids, inconsistent accents, and the abrupt dark footer added noise. Research entries now use spacing and rules, the interface uses a green and warm-neutral palette, and the footer follows the active theme.
- The publication page required manual HTML editing and inferred image paths from mutable display numbers. All 40 existing records now live in a CMS-editable JSON file with explicit, preserved image paths.
- Large topic clouds and sticky mobile filters competed with reading space. Topics are a keyboard-accessible disclosure, mobile controls scroll naturally, and the archive provides combined filters, result counts, clear/reset, empty, loading, and retry states.
- Metadata lacked social-sharing tags. Existing titles now have Open Graph metadata using the real portrait.

The shared stylesheet remains the refinement layer over existing page styles. The change does not introduce a frontend framework, production package dependencies, scroll interception, an authentication backend, analytics, or cookies. Existing scientific viewers still use their external library/data providers.

## Editing security

Pages CMS is configured as an external GitHub-authenticated editor. No credentials are embedded in the public website. Read `OWNER_GUIDE.md` for the required account activation and permission checks. Owner-only access depends on those external settings; it cannot be established by public frontend code or an editor schema.

Publication text is rendered through DOM text nodes, article links require HTTPS, and image paths are restricted to local raster assets. Failure to load a graphical abstract does not hide its citation.

## Validation

- Six browser/content tests pass: filter/search/topic reset; failed-load retry and empty lists; mobile navigation/theme/reduced motion on all five pages; insertion of a new publication on archive and homepage with existing image associations preserved; CMS schema and local images; HTML/script and unsafe URL rejection.
- All 40 migrated records were compared to the original extraction; all 31 image files exist.
- Checked phone, tablet, and desktop layouts at 320, 390, 820, and 1440 pixels; inspected light/dark screenshots. Local asset and navigation paths resolve.
- Fonts are served locally as WOFF2, reducing their combined transfer size from about 1.19 MB to 0.54 MB.
- Live GitHub/CMS authentication and deployment have not been performed. External scientific data providers are excluded from the automated regression suite.
