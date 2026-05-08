# HUGO XMIN

## _Keep it simple, but not simpler_

**XMin** is a Hugo theme written by [Yihui Xie](https://yihui.org) in about four hours: half an hour was spent on the Hugo templates, and 3.5 hours were spent on styling. The main motivation for writing this theme was to provide a really minimal example to beginners of Hugo templates. This fork keeps the same small-theme spirit while adding a base template, a video shortcode, and a minimal example site.


```bash
find . -not -path '*/exampleSite/*' \( -name '*.html' -o -name '*.css' \) | xargs wc -l
```

```
       4 ./layouts/404.html
       4 ./layouts/shortcodes/gallery.html
      19 ./layouts/shortcodes/bilibili.html
      28 ./layouts/_default/single.html
      23 ./layouts/_default/list.html
      12 ./layouts/_default/terms.html
      20 ./layouts/_default/baseof.html
      11 ./layouts/partials/pagination.html
      37 ./layouts/partials/seo.html
       1 ./layouts/partials/foot_custom.html
       0 ./layouts/partials/comment.html
       0 ./layouts/partials/head_custom.html
       7 ./layouts/partials/footer.html
       8 ./layouts/partials/header.html
     245 ./static/css/style.css
      14 ./static/css/fonts.css
     433 total
```

The theme is still intentionally compact, but the templates are now organized around Hugo's base layout system so metadata, SEO, pagination, and layout extensions can be handled in focused partials.

## Preview

The theme includes a minimal example site. From the theme root, run:

```bash
hugo server --source exampleSite --themesDir ../.. --theme hugo-xmin
```

Then open the local URL printed by Hugo.

## Shortcodes

Embed a Bilibili video with either positional or named parameters:

```md
{{< bilibili BV1xx411c7mD >}}
{{< bilibili id="BV1xx411c7mD" page="2" >}}
```

Create a responsive image gallery:

```md
{{< gallery columns="3" >}}
{{< figure src="/photos/example.jpg" alt="Example photo" >}}
{{< /gallery >}}
```
