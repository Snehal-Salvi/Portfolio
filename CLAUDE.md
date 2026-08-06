# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page static portfolio website (no build tooling, no package manager, no framework). It is deployed via GitHub Pages at https://snehal-salvi.github.io/Portfolio.

## Development

There is no build step, bundler, package.json, or test suite — this is plain HTML/CSS/JS served as static files.

- **Run locally**: open [index.html](index.html) directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) so relative asset paths resolve correctly.
- **Deploy**: push to the branch GitHub Pages is configured to serve (no CI/build pipeline involved).

## Architecture

The entire site is one page (`index.html`) split into `<section id="...">` blocks that double as both content containers and navbar anchor targets (`#home`, `#about`, `#experience`, `#skills`, `#education`, `#projects`, `#certificates`, `#contact`). The nav in `<header>` links to these IDs directly — adding/removing/renaming a section requires updating both the section `id` and the matching `<a href="#...">` in `#navLinks`.

The design is a dark-only minimal system built on CSS custom properties (no light mode, no theme toggle):

- **[style.css](style.css)** — all custom properties live in `:root` (`--bg`, `--bg-card`, `--accent`, `--border`, `--font-sans`, `--font-mono`, etc.); every color/spacing decision should reference these rather than hardcoding new values. Typography is Inter + JetBrains Mono loaded from Google Fonts in `index.html` `<head>`. A `@media (prefers-reduced-motion: reduce)` block at the end neutralizes all animations/transitions for users who request it — new animated components should keep working correctly with motion effectively disabled.
- **[mediaQueries.css](mediaQueries.css)** — responsive breakpoints at 900px (hero stacks, about-grid collapses to one column), 720px (nav collapses into the slide-in mobile menu), and 480px (typography/spacing tightens further). Loaded after `style.css`.
- **[script.js](script.js)** — all interactivity, registered inside one `DOMContentLoaded` listener, no modules/imports:
  - **Dynamic years-of-experience**: a single `CAREER_START_DATE` constant drives every `.yoe-number` span (hero, About paragraph, About stats) — update that one constant, not the markup, when the reference date needs to change.
  - **Mobile nav**: `#navToggle` toggles `.is-open` on `#navLinks`; clicking any nav link closes it again.
  - **Scroll reveal**: any element with `.reveal` fades/slides in via `IntersectionObserver` the first time it enters the viewport (class `.is-visible` is added and the observer unobserves it — one-shot, not re-triggered on scroll-up). Elements never scrolled into view stay at `opacity: 0` until then, which is expected — don't mistake this for a bug when testing with a `fullPage` screenshot taken before scrolling.
  - **Active nav highlighting**: a second `IntersectionObserver` (with a `-50% 0px -50%` root margin, effectively watching what's at vertical center) toggles `.active` on the matching `#navLinks` anchor as each `<section id>` crosses the middle of the viewport.
  - **Project video modal**: clicking any `.project-media[data-video-src]` (the `<video>` elements on project cards that have one) opens `#videoModal` and plays the same source full-size in `#largeVideo`; closes on the `.close-btn` or a click on the modal backdrop.
- No build-time asset pipeline exists, so there's no lint/format/test command to run after edits — verify changes by opening `index.html` in a browser (or the local static server) and checking the console.

External dependencies are CDN tags in `index.html` `<head>`: Google Fonts (Inter, JetBrains Mono) and a Font Awesome kit script for all icons. There is no Bootstrap, jQuery, or Popper — those were removed in the rebuild away from the original Bootstrap-based design.

## Content sections

- **Skills** (`#skills`) are categorized tag pills (`.skill-category` → `.skill-tags` → `.skill-tag`), grouped to mirror the categories in Snehal's resume (Languages / Frontend / Backend / Data & Cloud / Tools & Practices). There's no percentage/proficiency indicator — adding a skill is just adding a `<span class="skill-tag">`.
- **Projects** (`#projects`) are `.project-card` elements; each has either a `<video class="project-media" data-video-src="...">` (hosted on GitHub's `user-attachments` CDN, not stored in the repo) or, if no demo video exists, would need one added — there's no placeholder/icon fallback in the current design.
- **Certificates** (`#certificates`) are a static responsive grid (`.cert-card`), each linking out to an individual Google Drive file. **Each certificate file must have Drive sharing set to "Anyone with the link"** — file-level sharing that defaults to restricted will make the link redirect to `accounts.google.com/ServiceLogin` instead of the document (a 401/redirect-to-login, not a 404). The same applies to the résumé link in the hero. When a link "isn't working," check sharing settings before assuming the URL is wrong.
- Section content (experience, skills, education, projects, certificates) is hardcoded directly in `index.html` — there is no CMS or data file. Each section follows the same `eyebrow` (`01 — About`-style label) → `section-title` → content-block structure.

Images/logos/certificate reference assets live in [assets/](assets/) and are referenced with relative `./assets/...` paths. Note that several files in `assets/` (decorative section-header icons, old percentage-bar skill logos) are leftovers from the pre-rebuild design and are no longer referenced anywhere in `index.html`.
