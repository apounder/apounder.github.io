# Austin Pounder Research Website

Source for [apounder.github.io](https://apounder.github.io/), a static academic
portfolio covering research, publications, presentations, and curated chemistry
resources.



## Editing publications

Use the GitHub-connected Pages CMS form to add papers and upload graphical abstracts.
See the [owner setup and editing guide](docs/OWNER_GUIDE.md) for one-time activation,
owner-only access settings, and the everyday workflow.

The [design audit](docs/REDESIGN_NOTES.md) describes the visual and interaction changes.

## Local preview and checks

Run `python3 -m http.server 8000`, then open `http://localhost:8000`.
The site uses static HTML, CSS, and JavaScript; there is no production build step.

Browser checks: install `tests/requirements.txt` in a virtual environment, run
`python -m playwright install chromium`, then `python -m unittest discover -s tests -v`.
The tests start a local HTTP server automatically.
