# Development conventions

Practical conventions for this plain HTML, CSS, and JavaScript site. Keep existing
URLs working; add a page only when it offers useful content or a working feature.

## Page structure

- Set `lang="en"`, UTF-8, viewport metadata, a descriptive title, and a page-specific description.
- Start with the shared skip link to `<main id="main-content" tabindex="-1">`.
  The main element accepts the skip-link focus without entering the normal Tab order.
- Use one main landmark and one H1. Nest section headings logically; choose heading
  levels for structure, then use CSS for their appearance.
- Keep the shared header and footer consistent across pages. They currently live
  directly in each HTML file: update all copies when their structure or links change.
- Preserve the footer's unofficial-project notice, accurate AI-artwork disclosure,
  and any attribution or license notices required by the assets and content used.

## Styles

- `style.css` contains the shared palette, Manrope typography, page width, header/footer,
  links, buttons, focus indicators, and existing Home/Start Here layouts.
- Reuse the existing `--color-*` and `--font-*` properties. Shared layout values are
  `--content-max-width` (1200px) and `--page-width` (88%); `.page-width` combines them.
- `--color-action-hover` preserves the rust button hover color;
  `--color-divider-on-dark` is the common translucent divider on green surfaces.
  `--nav-target-height` sets the primary navigation's 2.75rem minimum height.
- Use descriptive class names, such as `.dice-feedback`. Keep a component's
  styling together; avoid selectors whose meaning depends on its position in a list.
- Give a new substantial feature its own stylesheet when its layout and controls
  are specific to that feature. Load it after `style.css`; keep shared styles in
  the shared file. Create stylesheets as features are developed.
- Keep layouts suited to their content: a tool needs prominent controls and results;
  a guide needs a readable learning sequence. Use the shared styles for consistency.

## JavaScript

- Use JavaScript for useful behavior, not essential navigation or static reading.
  Keep meaningful instructions available when scripts fail or are disabled.
- Keep independent features in clear initialization functions, as in
  `initializeCastleEncounter()` and `initializeDice()`. Use a separate script for a
  substantial independent feature; extract shared functions or modules when needed.
- Use native buttons and labeled inputs, event listeners, and `textContent` for text
  updates. Guard initialization when a feature is absent. Load page scripts with `defer`.
- Expose selected states accessibly and announce important results with an appropriate
  status region. Do not unexpectedly move focus; keep controls keyboard-operable.
- Respect `prefers-reduced-motion` in CSS and JavaScript. Meaning and results must
  remain clear without animation. Keep the educational D20 separate from future tools.

## Navigation

- Current destinations are Home, The experience, and Start here. Use consistent labels
  and document-relative links; add destinations when their content is ready.
- Put `aria-current="page"` on the current page's link. It identifies location;
  `.nav-start` identifies Start Here's special styling regardless of link order.
- Keep visible keyboard focus. Primary links should be at least 2.75rem high and
  wrap cleanly when space runs out, including at enlarged text/zoom settings.
- Retain the existing 1000px, 700px, and 400px responsive conventions where they fit;
  add a breakpoint only when the content requires it. A menu script is not needed now.

## Assets

- Keep shared images in `images/`. Introduce feature subfolders only when real assets
  justify them. Use descriptive filenames and avoid repeating artwork without a purpose.
- Compress images appropriately, preserve sharpness, and supply width/height to reserve
  space. Use `srcset` and accurate `sizes` for responsive variants; allow for pixel density.
- Lazy-load below-the-fold images. Keep important opening imagery available promptly.
- Describe useful visual information in `alt`; use `alt=""` for decorative images.
  Preserve required credits, record sources/licenses, and distinguish generated scenes
  from documentary photography.

## GitHub Pages paths

The repository is `gillatr0n/basics-web`, published at
[gillatr0n.github.io/basics-web](https://gillatr0n.github.io/basics-web/).

- Prefer document-relative references: root pages use `style.css` and `images/...`.
  A future page one directory deeper would use `../style.css`, `../index.html`,
  and `../images/...`; its own neighboring assets can use local relative paths.
- A leading slash, such as `/style.css`, starts at the domain root and can bypass a
  repository prefix. Test beneath `/basics-web/`, not only at `/`.
- Resolve CSS `url(...)` paths relative to the stylesheet, not the HTML page.
  Keep filename case correct and check cross-page fragment links as well as file paths.

## Review and testing

- Check both affected and shared pages at 320, 375, 768, 1024, and 1440px, plus 200%
  browser zoom. Look for clipping, overlap, horizontal overflow, and awkward wrapping.
- Use Tab, Shift+Tab, Enter, and relevant control keys. Check the skip link, visible
  focus, current/selected states, readable feedback, and reduced-motion behavior.
- Check script-disabled fallbacks, all local links/anchors, images, stylesheets,
  scripts, favicon, and the browser console under a repository-prefixed preview URL.
- After shared changes, retest the five chapter links, castle choices, D20 rolls,
  modifier changes, and natural 1/20 explanations. Never equate a natural roll with
  automatic success/failure on an ordinary ability check.
- Review every changed file and `git diff --check`. Record actual results and testing
  limits; screen-reader announcements require testing beyond DOM inspection.
