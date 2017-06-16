# Hugo XMin

Hugo XMin is a restrained, content-first Hugo theme. It keeps the original
XMin idea of small semantic templates while improving typography, responsive
layouts, article metadata, photo indexes, and gallery accessibility.

## Features

- Minimal single-column home and article layouts
- Configurable recent-post count and date format
- Responsive post, taxonomy, and photo indexes
- Photo cover discovery from front matter, page resources, or content
- Multi-column gallery shortcode with an accessible lightbox
- Optional table of contents and comment partials
- SEO, Open Graph, Twitter card, RSS, and canonical metadata
- No JavaScript framework or asset build step

## Install

Add the theme as a Git submodule:

```bash
git submodule add -b modify https://github.com/qmdx00/hugo-xmin themes/hugo-xmin
```

For an existing clone, initialize all submodules:

```bash
git submodule update --init --recursive
```

## Configuration

A complete copy-ready configuration is available at
[`exampleSite/hugo.toml`](exampleSite/hugo.toml). The following example shows
all theme-specific options and the recommended Hugo settings:

```toml
baseURL = "https://example.org/"
locale = "zh-CN"
title = "My XMin Site"
theme = "hugo-xmin"

[params]
author = "Your Name"
description = "A minimal personal site built with Hugo XMin."
footer = "&copy; [Your Name](https://example.org/) 2024 - {Year}"
tocTitle = "目录"
recently = 6
dateFormat = "2006/01/02"
photoListColumns = 2

[pagination]
pagerSize = 30

[permalinks.page]
posts = "/posts/:year/:month/:contentbasename/"
photos = "/photos/:year/:contentbasename/"

[[menus.main]]
name = "主页"
pageRef = "/"
weight = 10

[[menus.main]]
name = "随笔"
pageRef = "/posts"
weight = 20

[[menus.main]]
name = "相册"
pageRef = "/photos"
weight = 30

[[menus.main]]
name = "分类"
url = "/categories/"
weight = 40

[[menus.main]]
name = "标签"
url = "/tags/"
weight = 50

[taxonomies]
category = "categories"
tag = "tags"

[markup.highlight]
codeFences = true
guessSyntax = true
noClasses = true
style = "github"

[markup.tableOfContents]
startLevel = 2
endLevel = 5
ordered = false

[minify]
minifyOutput = true
```

### Theme parameters

| Parameter | Default | Purpose |
| --- | --- | --- |
| `author` | empty | Default author displayed in article metadata |
| `description` | empty | Site description used by SEO metadata |
| `footer` | empty | Markdown-enabled footer; `{Year}` is replaced at build time |
| `tocTitle` | `Contents` | Label for the collapsible article table of contents |
| `recently` | `6` | Number of entries listed on the home page |
| `dateFormat` | `2006/01/02` | Hugo date format used by lists and article metadata |
| `photoListColumns` | `2` | Number of desktop columns on the photo index |

Use `[pagination].pagerSize` to control list-page pagination. The theme defaults
to Hugo's configured value and does not hard-code a page size.

## Content

Create a regular article:

```bash
hugo new content posts/my-article.md
```

The default archetype includes article metadata, taxonomy fields, and the table
of contents switch:

```yaml
---
date: 2025-01-01T10:00:00+08:00
title: My Article
description: A short article summary.
toc: true
tags: [Hugo]
categories: [Technology]
draft: true
---
```

Create a photo entry with the dedicated archetype:

```bash
hugo new content --kind photos photos/my-album.md
```

Set `cover` when the album needs an explicit index image:

```yaml
---
date: 2025-01-01T10:00:00+08:00
title: My Album
cover: https://example.org/cover.jpg
toc: false
tags: []
categories: [Photography]
draft: false
---
```

Photo covers are resolved in this order:

1. The page's `cover` front matter value.
2. A page resource whose name starts with `cover`, `featured`, or `thumbnail`.
3. The first `src` attribute found in the page content.

## Gallery shortcode

Wrap Hugo `figure` shortcodes in `gallery`. The optional `columns` value
controls the desktop column count; mobile layouts always use one column.

```go-html-template
{{</* gallery columns="2" */>}}

{{</* figure
  src="https://example.org/photo.jpg"
  alt="Mountain trail"
  caption="A quiet afternoon walk"
*/>}}

{{</* /gallery */>}}
```

Gallery images can be opened with a mouse, Enter, or Space and closed by
clicking the backdrop, using the close button, or pressing Escape.

## Customization

Override these empty partials in the consuming site when integrations are
needed:

- `layouts/partials/head_custom.html` for custom styles, fonts, and analytics
- `layouts/partials/foot_custom.html` for scripts loaded before the footer
- `layouts/partials/comment.html` for a comment provider such as Waline

Site files override theme files. Prefer placing small site-specific adjustments
in `static/css/custom.css` and loading that stylesheet from `head_custom.html`.

## Development

Preview a consuming Hugo project against a neighboring theme checkout without
changing its submodule pointer:

```bash
hugo server \
  --source ../hugo-blog \
  --themesDir .. \
  --disableFastRender
```

Build the same project into a temporary output directory:

```bash
hugo \
  --source ../hugo-blog \
  --themesDir .. \
  --destination /tmp/hugo-xmin-preview \
  --cleanDestinationDir
```

## License

MIT. Hugo XMin is based on the original
[XMin theme](https://github.com/yihui/hugo-xmin) by Yihui Xie.
