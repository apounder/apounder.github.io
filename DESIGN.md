---
name: Austin Pounder research website
description: A photographic green introduction and a white scientific reading surface.
colors:
  introduction-green: "#1d302b"
  introduction-line: "#395048"
  introduction-text: "#f7faf5"
  introduction-muted: "#bdcec1"
  introduction-copy: "#d1ded4"
  introduction-border: "#7f9b8c"
  introduction-accent: "#a9e7b7"
  introduction-hover: "#d6f5de"
  paper: "#ffffff"
  hero: "#ffffff"
  surface: "#ffffff"
  soft: "#f6f8f7"
  ink: "#253b34"
  muted: "#59655f"
  line: "#dce2df"
  blue: "#315e4b"
  blue2: "#507d67"
  science-white: "#ffffff"
  dark-paper: "#131d19"
  dark-hero: "#18251e"
  dark-surface: "#1a2720"
  dark-soft: "#202e25"
  dark-ink: "#eeeede"
  dark-muted: "#adb9ad"
  dark-line: "#344739"
  dark-blue: "#a3c6a6"
  dark-blue2: "#80aa8c"
typography:
  display:
    fontFamily: "DM Sans, Segoe UI, sans-serif"
    fontSize: "clamp(52px, 5.3vw, 76px)"
    fontWeight: 750
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Sans, Segoe UI, sans-serif"
    fontSize: "clamp(34px, 3.6vw, 48px)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(24px, 2.2vw, 29px)"
    fontWeight: 400
    lineHeight: 1.18
  featured-title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(28px, 2.5vw, 36px)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.62
  navigation:
    fontFamily: "DM Sans, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.62
  filter:
    fontFamily: "DM Sans, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0"
rounded:
  flat: "0"
  tag: "2px"
  control: "3px"
spacing:
  compact: "8px"
  small: "14px"
  medium: "20px"
  grid: "24px"
  generous: "28px"
  inset: "32px"
components:
  button-primary:
    backgroundColor: "{colors.introduction-accent}"
    textColor: "{colors.introduction-green}"
    rounded: "{rounded.control}"
    padding: "13px 19px"
  button-primary-hover:
    backgroundColor: "{colors.introduction-hover}"
    textColor: "{colors.introduction-green}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.introduction-text}"
    rounded: "{rounded.control}"
    padding: "13px 19px"
  filter:
    backgroundColor: "{colors.paper}"
    textColor: "#40504a"
    rounded: "{rounded.tag}"
    padding: "10px 14px"
    typography: "{typography.filter}"
  filter-active:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.science-white}"
  search:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
  scientific-figure:
    backgroundColor: "{colors.science-white}"
    padding: "clamp(20px, 3vw, 36px)"
  poster-preview:
    backgroundColor: "{colors.science-white}"
    padding: "14px"
---

# Design System: Austin Pounder research website

## Overview

**Creative North Star: "The scientific reading room"**

The implemented world combines a deep green photographic introduction with calm white reading surfaces. Strong DM Sans identity and section headings give the site a clear frame; Newsreader scientific titles carry the detail of the work. The confirmed reference is The Matter Lab; the proposal uses its green, photographic confidence without copying its logo, artwork, or group identity.

Real supplied portrait photography, graphical abstracts, and PDF-derived poster previews are the visual evidence. Components are restrained and mostly flat. Scientific material remains legible at its original proportions, while text and metadata carry navigation through the archive.

**Key Characteristics:**
- Deep green photographic introduction and navigation.
- White reading surfaces with ruled, mostly flat content groups.
- Self-hosted DM Sans and Newsreader with distinct roles.
- Real scientific images, preserved rather than recreated.
- Visible focus, responsive reading layouts, and reduced-motion support.

This is a scan of the finalized offline review copy. Evidence is the final cascade in assets/css/site.css, loaded after each page's inline styles, and component construction in assets/js/site.js, assets/js/publications.js, and assets/data/presentations.js. Earlier CSS layers remain; only effective values are normative here.

## Colors

Green frames the introduction; white surfaces and quiet green text support reading. The frontmatter owns exact primitive values, retaining the existing CSS names blue and blue2 even though these are green hues.

### Primary
- **Introduction Green:** shared header and photographic homepage introduction, consistent across themes.
- **Introduction Accent:** role text, active navigation, primary introduction action, and focus outlines on green.
- **Introduction Hover:** lightened action surface on hover.
- **Reading Green (blue):** article links, research links, filters, and scientific metadata.
- **Secondary Reading Green (blue2):** existing secondary green token.

### Neutral
- **Paper:** default white body and archive surface; elevated resolves to the same value in light mode.
- **Hero:** white subpage introduction surface.
- **Surface:** white biography, research-area navigation, and footer surfaces.
- **Soft:** subtle neutral hover and loading states.
- **Ink / Muted / Line:** primary copy, supporting copy, and fine separators.
- **Scientific White:** neutral image canvas for supplied abstracts and poster PDFs across themes.
- **Introduction Text / Copy / Muted / Border / Line:** supporting values inside the green frame.
- **Dark tokens:** replace reading surfaces, text, dividers, and links through the existing dark theme. The photographic introduction remains green.

**The Evidence Canvas Rule.** Scientific images use a white canvas with contained proportions; recoloring the supplied science is not part of the visual identity.

## Typography

**Display and Body Font:** DM Sans, with Segoe UI and sans-serif fallbacks.

**Scientific Title Font:** Newsreader, with Georgia and serif fallbacks.

Both families are self-hosted WOFF2 assets. DM Sans has a variable weight range of 100–1000; Newsreader has normal and italic assets with a range of 200–800. Navigation is medium, the name is bold, and scientific titles are regular.

### Hierarchy
- **Display:** uppercase researcher name with compact leading and balanced lines. At 980px and below size becomes clamp(42px, 5.8vw, 60px); at 760px it becomes clamp(49px, 13vw, 72px).
- **Headline:** DM Sans section headings. Mobile headings settle at 36px. Subpage titles use clamp(44px, 5vw, 64px) with unit leading.
- **Title:** Newsreader archive article titles. Mobile archive titles use 27px; recent editorial titles use 24px. Featured titles use the separate featured-title role and become 29px on mobile.
- **Body:** DM Sans text. Longer biography text uses 17px/1.75, constrained to 70ch, becoming 16px on mobile. Introduction copy uses 18px/1.65 and 42ch, becoming 16px below 980px.
- **Metadata:** 13px/1.65 in recent research and presentations; archive authors remain 13px, while state, topic, and detail controls use 12px.
- **Navigation / Filters:** medium sans-serif labels. Mobile navigation becomes 16px in full-width rows with at least 48px height.

**The Two Voices Rule.** Use DM Sans for identity, navigation, and section structure; use Newsreader for scientific titles and long-form research headings.

## Layout

The centered container is capped at 1380px, with padding clamp(22px, 5vw, 76px). Section rhythm uses clamp(60px, 6.5vw, 96px) vertical padding. The frontmatter spacing steps are observed reusable distances, not a newly imposed mathematical scale.

The homepage introduction has equal portrait and copy columns with a fluid 40–88px gap, and desktop padding of 64px/80px. At 760px columns stack with copy first, a 30px gap, and 36px/48px vertical padding. The portrait is capped at 440px and changes from square to a 1.15 aspect ratio. No decorative molecular background remains.

Featured image and article copy use two columns, proportioned 1:1.1 with a 28–64px gap; they stack at 760px. Research summaries use full-width ruled rows, with a title column and description column, becoming one column at 760px. Research detail copy and related-publication evidence stack at 980px.

Publication years form a 104px rail beside article rows. Graphical abstracts move below article text at 900px. At 760px years become block headings, rows become one column, and the toolbar becomes non-sticky. Desktop archive and resource toolbars sit below the sticky header.

Presentation previews use three columns, two at 1050px, and one at 760px. Resources use two columns and one at 760px; their grid is transparent with no colored join or outer border. Navigation switches to a menu at 980px. Header height is 76px above 760px and 66px below it.

## Elevation & Depth

Reading surfaces are mostly flat: research summaries, resources, and presentations do not use resting shadows. Rules and restrained tones communicate grouping. The header has no resting shadow; after 12px of scroll its diffuse shadow is 0 6px 24px #253b3409. The mobile menu retains 0 18px 30px rgba(23, 32, 30, 0.09).

**The Flat Evidence Rule.** Research evidence and poster previews are organized by type, space, and dividers rather than lifted card decoration.

State changes use short color transitions and an ease-out curve, with a 1px press translation for buttons and introduction actions. Introduction arrival animation and reading-content reveal transforms are disabled in the final layer. Reduced-motion preferences remove transitions and animation and restore automatic scrolling.

## Shapes

Reading groups are rectangular. Controls and the portrait use subtle 3px corners; filter chips use 2px corners. Resource and presentation cards are square. Research summaries use horizontal rules. Scientific images are contained; the portrait is the intentional photographic crop.

## Components

### Buttons

Introduction actions are rectangular links with a 46px minimum height. Primary uses Introduction Accent with green text; secondary uses a transparent surface and Introduction Border. Both become Introduction Hover with dark green text on hover. Padding is 13px/19px, changing to 12px/14px below 980px. Focus on green uses the bright introduction accent. Reading-room recovery primary uses Reading Green with white text.

### Filters and search

Status and resource filters are rectangular controls with 2px corners and a 44px minimum height. Active and hover states use Reading Green and white text. Topic tags sit inside a native disclosure; article topic controls use understated text and an underline when hovered or selected.

Search fields use paper, a 1px green-gray stroke, 3px corners, 9px/12px padding, and a 46px minimum height. Focus changes the border to Reading Green and retains a visible outline. Publication status is announced politely; clear-filters and explicit no-results copy recover empty states. Resource search also has a clear-search-and-filters recovery action.

### Reading groups and scientific evidence

Recent rows pair a year, Newsreader title, metadata, and article destination. A featured publication uses a real graphical abstract on white, title and metadata, and an underlined article link. Archive abstracts preserve their proportions beside each title. Article and image destinations remain separate.

Research summaries are transparent ruled groups with linked serif titles and descriptive text. Research detail pages connect each area to related publications. Resource cards use a top rule with no outer grid decoration; section titles and filters provide categorization without repeated labels. Resource hover remains stationary.

### Navigation

The sticky green header contains the wordmark, pages, email, theme toggle, and menu. Current and hovered links use Introduction Accent and a fine desktop underline. At 980px the menu opens a green vertical list; activation focuses the first link, Escape returns focus to the trigger, and outside clicks or navigation close it. At 760px the theme label hides while its accessible label remains. Theme choice persists when local storage is available and otherwise works on the current page.

### Presentation preview

Each thumbnail comes from the real PDF's first page, on white with 14px padding and a fine border. Image height is 250px or 290px on mobile, using contained proportions. Title uses Newsreader 28px/1.2, with 13px event metadata and a full-resolution PDF destination. Thumbnail provenance accompanies the assets.

### Molecular structures

Molecular structures are always visible in an ordinary section, including on mobile. Automatic model rotation is disabled on every device. Offline schematic stages are 300px tall or 240px on mobile, with white backgrounds, fine borders, and no shadow. Copy explicitly identifies schematic offline material; external structure loading is not an offline guarantee. Every recent homepage paper includes a graphical abstract that opens independently at full resolution.

## Do's and Don'ts

### Do:
- **Do** preserve the green introduction, white reading surfaces, and distinct DM Sans/Newsreader roles.
- **Do** use supplied portrait, scientific abstracts, and PDF-derived previews with documented provenance.
- **Do** keep figures contained on white and make article and PDF destinations explicit.
- **Do** preserve visible focus, announced results, recovery controls, and reduced-motion behavior.

### Don't:
- **Don't** copy The Matter Lab's logo, artwork, or institutional/group claims.
- **Don't** recolor, redraw, or invent scientific evidence to fill an image slot.
- **Don't** revive decorative molecular imagery behind the photographic introduction.
- **Don't** promote inherited obsolete overrides, section kickers, or glyph-only icons into reusable system rules.

## White-surface refinement

Reading backgrounds, subpage introductions, biography, and footer use pure white. Soft resolves to a neutral hover/loading surface. Molecular stages use white with a fine border. Research areas form a typographic index with a title column and description column, stacking on mobile. Decorative research SVGs and redundant topic labels are removed. Header and footer identity use the researcher name without a repeated research subtitle. Section headings use direct subject names. Links use one authored SVG arrow family. Supplied science, status ordering, default-visible static molecules, and the green photographic introduction are preserved.
