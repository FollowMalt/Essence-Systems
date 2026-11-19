# Essence Systems website

The site is built with [Jekyll](https://jekyllrb.com), which GitHub Pages runs automatically on every push. You don't need to install anything to publish.

## Add a development update

Create a file in `_updates/` named `YYYY-MM-DD-short-name.md`:

```markdown
---
title: Astra library view
project: astra            # essence, astra or allura (see _data/projects.yml)
date: 2026-11-10
image: /assets/img/updates/library.png   # optional
---
One or two sentences about what changed.
```

It appears on the Updates page and the three newest show on the home page.

## Add a page

Create `my-page.html` (or `.md`) in the root:

```markdown
---
title: Press
eyebrow: Essence
heading: Press and media
lede: A short intro line.
---
<section class="section"><div class="container prose">
  Your content here.
</div></section>
```

The header, footer, fonts and styles come from `_layouts/`. To add it to the menu, add a line to `_data/navigation.yml`.

## Add screenshots

Put images in `assets/img/astra/` or `assets/img/allura/`, then point a placeholder at them:

```liquid
{% include screen.html device="desktop" label="Music library" src="/assets/img/astra/library.png" %}
```

`device` is `desktop` or `phone`. Without `src` a labelled placeholder is shown.

## Structure

| Path | What it is |
| --- | --- |
| `_config.yml` | Site title, base URL, optional logo image |
| `_layouts/` | Page shells (`default`, `page`) |
| `_includes/` | Nav, footer, device frame, update card |
| `_data/` | Navigation and project labels |
| `_updates/` | One file per update |
| `assets/css/essence.css` | Core design system (colors, type, motion, components) |
| `assets/css/astra.css`, `allura.css` | Product-specific styling |
| `assets/js/essence.js` | Scroll reveals, scroll stories, nav, update filters |

## Preview locally (optional)

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/Essence-Systems/.
