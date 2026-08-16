/*
=====================================================================
PRESENTATION DATA
=====================================================================

This is the main file used by posters.html.

To add a new presentation:
1. Copy one object.
2. Change the id, type, year, title, pdf, and events.
3. Put the PDF in assets/presentations/.
4. Save this file.

Allowed types:
    "Poster"
    "Talk"

If the same poster/talk was presented more than once,
keep ONE entry and add all venues to the events array.

The website sorts entries automatically by year.
=====================================================================
*/

window.PRESENTATION_FILES = [

    {
        id: "gfp-surrogates",
        type: "Poster",
        year: 2025,

        title:
            "Computational Insights into Modular Nucleobase GFP-Surrogates",

        pdf:
            "assets/presentations/gfp-surrogates.pdf",

        events: [
            "18th Annual Chinook Symposium — Lethbridge, 2025",
            "WATOC 2025 — Oslo, Norway, 2025"
        ]
    },


    {
        id: "rna-aptamers",
        type: "Poster",
        year: 2025,

        title:
            "Computational Investigation of RNA Aptamers",

        pdf:
            "assets/presentations/rna-aptamers.pdf",

        events: [
            "RiboWest — 2025"
        ]
    },


    {
        id: "rh-ring-opening-poster",
        type: "Poster",
        year: 2023,

        title:
            "Rhodium-Catalyzed Ring-Opening Reactions of Heterobicyclic Alkenes",

        pdf:
            "assets/presentations/rh-ring-opening.pdf",

        events: [
            "Chinook Symposium — Lethbridge, 2023",
            "Guelph-Waterloo Centre for Graduate Work in Chemistry and Biochemistry Symposium — 2023"
        ]
    },


];
