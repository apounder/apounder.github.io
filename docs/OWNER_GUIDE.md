# Add publications without editing HTML

The website stays on GitHub Pages. [Pages CMS](https://app.pagescms.org/) provides the editing interface, using the form configured in [`.pages.yml`](../.pages.yml). Publications are stored in [`assets/data/publications.json`](../assets/data/publications.json). Saving content commits changes to GitHub; the existing GitHub Pages deployment then publishes them.

## One-time activation

1. Commit and push these website changes to the branch used by GitHub Pages.
2. Open [Pages CMS](https://app.pagescms.org/) and sign in with your **apounder** GitHub account.
3. Install its GitHub App for **only `apounder.github.io`**, rather than all repositories. This allows the hosted CMS to read and commit content in that repository.
4. Select `apounder/apounder.github.io` and your existing Pages publishing branch. The Publications form is defined already; you do not need to create a configuration.
5. Confirm that your repository's **Settings → Collaborators** gives no other person write access. In Pages CMS, leave the collaborator/invitation list empty (remove existing invitations if any). CMS collaborators are managed in the hosted service, not in this YAML file.
6. Protect your GitHub login with two-factor authentication or a passkey. Keep GitHub Pages' HTTPS enforcement enabled.

This account connection must be completed in your own GitHub session. The repository configuration alone cannot install the app, audit your account permissions, or verify an owner-only login. No live deployment or account configuration was performed by the local redesign.

## Add a publication

1. Use **Owner sign in** in the website footer, or bookmark Pages CMS.
2. Open **Publications**, then add an item to **Publication list**.
3. Enter the title, authors, year, status, and journal. Use semicolons between authors and `Pounder, A.` to highlight your name. An asterisk marks a corresponding author.
4. Optionally enter citation details and a full `https://doi.org/…` link.
5. Optionally select or upload a JPG, PNG, WebP, or AVIF graphical abstract. Use a descriptive, unique filename. Images remain attached to their paper when other entries move.
6. Save. Wait for the GitHub Pages deployment to complete, then refresh the site.

The archive lists **all Submitted manuscripts before Published papers**, with descending year order within each status. Within the same year and status, the editor's list order is preserved, so move the newest paper above earlier papers in the same group. Display numbers are recalculated automatically. The homepage shows the first four published articles from the same data. Topic tags are inferred from the publication text. In-preparation papers are excluded from the public data and editor options; keep draft records outside this repository.

To update an existing publication, expand its title in the editor and change its fields. To remove one, remove that list item and save. Avoid editing the same list in multiple browser tabs. Keep a copy of the old value if you are unsure; GitHub commit history can restore earlier versions.

## What “owner-only” means here

GitHub Pages serves a public, read-only website. It cannot keep an HTML admin page or a browser-side password secret. There is deliberately no local password form, write endpoint, GitHub token, or CMS script on the public site.

The editing interface lives on Pages CMS, which authenticates against GitHub and performs authorized repository writes on its server. A visitor can see the public sign-in link, source code, configuration, and publication data; that does not grant write access. Forking the repository only allows editing their own copy. For owner-only access, only your account may have repository write access, and you must not invite CMS collaborators. Existing access grants, account compromise, and the hosted CMS service remain part of the trust boundary; `.pages.yml` is a form schema, not an access-control rule.

**Everything in the publication data is public**, including “Submitted” manuscripts. Keep in-preparation papers, confidential drafts, credentials, and private notes outside this public repository and its CMS fields. The public renderer also excludes legacy records marked “in preparation,” but unpublished information must not be stored in the public JSON file.

You can revoke the Pages CMS installation in GitHub **Settings → Applications → Installed GitHub Apps**. The public website will continue working with its last committed data.

## Troubleshooting

- **Repository missing in the CMS:** check the app installation's selected repositories and sign-in account.
- **Save denied:** verify your repository permissions and publishing branch. If a branch rule requires pull requests, follow that review workflow; do not disable branch protection just to bypass it.
- **Changes saved but not live:** inspect the repository's Pages deployment/Actions status and confirm you edited its publishing branch. This redesign does not change your deployment source.
- **Images missing:** confirm the selected file exists under `assets/images/publications/`. The page supports explicit local raster-image paths; a failed image is removed while its citation remains readable.
- **Publication list unavailable:** use Try again. The archive validates data before rendering and offers Google Scholar if the request fails. The homepage retains its static fallback on a failed request.
- **Local preview:** run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`. Fetching JSON requires HTTP; opening HTML directly using `file://` is not supported. Without JavaScript the publication page offers a Google Scholar link.

References: [Pages CMS quick start](https://pagescms.org/docs/quick-start/), [CMS collaborators](https://pagescms.org/docs/configuration/collaborators/), [CMS authentication](https://pagescms.org/docs/development/authentication/), [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
