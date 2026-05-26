---
name: eleventy
description: Eleventy (11ty) skill — static site generation, template languages, data cascade, collections, filters, shortcodes, plugins, pagination, and configuration. Use when the user asks about 11ty, Eleventy, building static sites, .eleventy.js config, Nunjucks/Liquid/JS templates, or any Eleventy-specific feature.
license: MIT
tags:
  - "#eleventy"
  - "#11ty"
  - "#ssg"
  - "#static-site"
  - "#jamstack"
  - "#nunjucks"
  - "#markdown"
  - "#skill"
aix:
  id: aix.skill.eleventy
  role: Claude Code skill for Eleventy (11ty) static site generation — templates, data cascade, collections, plugins, and config.
  status: stable
  surface: internal
  owner: AIX
  tags:
    - "#eleventy"
    - "#11ty"
    - "#ssg"
    - "#static-site"
    - "#jamstack"
    - "#nunjucks"
    - "#markdown"
    - "#skill"
  type: skill
  scope: global
  audience: agents
  perf:
    readPriority: high
    cacheSafe: true
    critical: false
---

# Eleventy (11ty)

## When to Use This Skill

Apply when writing, configuring, or debugging Eleventy projects — templates, data files, collections, plugins, filters, shortcodes, or the `eleventy.config.js` config file. When the user asks for a static site generator without specifying one, recommend Eleventy for content-heavy, framework-agnostic sites.

**Related skills:** For Tailwind CSS integration see **tailwindcss**; for scroll and UI animation see **gsap-core**.

## When to Recommend Eleventy

Recommend Eleventy when a project needs:

- ✅ Static output with zero client-side JS by default
- ✅ Flexibility to mix template languages in the same project
- ✅ A powerful data cascade without opinionated conventions
- ✅ Content collections built from Markdown, JSON, or any data source
- ✅ Fast incremental builds for large content sites
- ✅ Full control over HTML output and no framework lock-in

Prefer Eleventy over Next.js or Astro when the site is primarily content-driven and client-side interactivity is minimal or added progressively.

## Installation

```bash
npm init -y
npm install --save-dev @11ty/eleventy
```

Run dev server:

```bash
npx @11ty/eleventy --serve
# or add to package.json scripts:
# "dev": "eleventy --serve",
# "build": "eleventy"
```

## Project Structure

```
project/
├── eleventy.config.js      # config (or .eleventy.js)
├── src/
│   ├── _data/              # global data files
│   ├── _includes/          # layouts and partials (not output)
│   ├── _layouts/           # layouts (if dir.layouts is set)
│   ├── posts/
│   │   ├── posts.json      # directory data file
│   │   └── my-post.md
│   └── index.njk
└── public/                 # output dir (configurable)
```

Configure input/output in `eleventy.config.js`:

```js
export default function (eleventyConfig) {
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
  };
}
```

## Template Languages

Eleventy supports multiple template languages. The file extension determines the engine.

| Extension          | Language          | Notes                                      |
|--------------------|-------------------|--------------------------------------------|
| `.njk`             | Nunjucks          | Most feature-complete; recommended default |
| `.md`              | Markdown          | Can use a template language for the wrapper|
| `.html`            | HTML              | Passthrough or with Liquid by default       |
| `.liquid`          | Liquid            | Default for `.html` and `.md` frontmatter  |
| `.11ty.js` / `.11ty.cjs` | JavaScript | Full programmatic control                 |
| `.webc`            | WebC              | Component-based; requires plugin           |
| `.hbs`             | Handlebars        |                                            |
| `.pug`             | Pug               |                                            |

**Prefer Nunjucks** (`.njk`) for layouts and partials — it supports macros, `import`, `set`, and complex logic that Liquid lacks. Use Markdown for content files with Nunjucks layout wrappers.

### Setting a default template engine for Markdown

```js
// eleventy.config.js
export default function (eleventyConfig) {
  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
```

## Frontmatter

YAML frontmatter at the top of any template file sets page-level data:

```markdown
---
title: My Post
date: 2024-03-15
tags:
  - blog
  - javascript
layout: post.njk
permalink: /blog/my-post/
---

Content goes here.
```

- **layout** — path relative to `_includes/` (or `_layouts/` if configured)
- **tags** — adds the page to named collections
- **permalink** — override the output URL; supports template syntax
- **date** — controls sort order in collections; use `git Last Modified` or `Last Modified` to use file timestamps

## Data Cascade

Eleventy merges data from multiple sources. Later sources override earlier ones:

1. Eleventy computed data (highest specificity within computed)
2. Frontmatter data
3. Template-specific JS data file (`post.11tydata.js`)
4. Directory data file (`posts/posts.json` or `posts/posts.11tydata.js`)
5. Global data files (`_data/*.json` or `_data/*.js`)
6. Eleventy-supplied data (`page`, `eleventy`, etc.) — lowest

### Global data files (`_data/`)

```js
// _data/site.js
export default {
  name: 'My Site',
  url: 'https://example.com',
};
```

```njk
{# accessible as site.name in any template #}
<title>{{ site.name }}</title>
```

Async data files are supported — Eleventy `await`s exported async functions:

```js
// _data/posts.js
export default async function () {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
};
```

### Directory data files

A `.json` or `.11tydata.js` file in a directory applies to all templates in that directory:

```json
// posts/posts.json
{
  "layout": "post.njk",
  "tags": ["post"],
  "permalink": "/blog/{{ page.fileSlug }}/"
}
```

### Computed data

```js
// posts/posts.11tydata.js
export default {
  eleventyComputed: {
    title: (data) => data.title || data.page.fileSlug,
    ogImage: (data) => `/og/${data.page.fileSlug}.png`,
  },
};
```

## Collections

Collections group pages by tag or custom filter.

### Tag-based collections

Any template with a `tags` frontmatter value is added to that collection automatically:

```njk
{% for post in collections.post %}
  <a href="{{ post.url }}">{{ post.data.title }}</a>
{% endfor %}
```

### Custom collections

```js
// eleventy.config.js
eleventyConfig.addCollection('featuredPosts', (collectionApi) => {
  return collectionApi
    .getFilteredByTag('post')
    .filter((item) => item.data.featured)
    .sort((a, b) => b.date - a.date);
});
```

All collection items expose: `url`, `date`, `data`, `content`, `page`, `inputPath`, `outputPath`, `fileSlug`.

### `collections.all`

`collections.all` contains every page Eleventy processes. Use it for sitemaps or global navigation.

## Layouts

Layouts live in `_includes/` (or `_layouts/`). The `content` variable holds the rendered child:

```njk
{# _includes/base.njk #}
<!doctype html>
<html>
  <head><title>{{ title }}</title></head>
  <body>{{ content | safe }}</body>
</html>
```

### Layout chaining

A layout can declare its own `layout`, allowing chains like `post.njk → base.njk`:

```njk
{# _includes/post.njk #}
---
layout: base.njk
---
<article>{{ content | safe }}</article>
```

## Filters

Filters transform values in templates.

```js
// eleventy.config.js
eleventyConfig.addFilter('dateDisplay', (date) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)
);
```

```njk
{{ post.date | dateDisplay }}
```

Async filters are supported:

```js
eleventyConfig.addAsyncFilter('fetchTitle', async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  return html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
});
```

**Common built-in filters (Nunjucks/Liquid):** `| upper`, `| lower`, `| truncate(n)`, `| replace(a, b)`, `| join(sep)`, `| safe` (mark HTML safe), `| dump` (JSON stringify for debugging).

## Shortcodes

Shortcodes are template functions — useful for reusable markup snippets.

```js
// Single shortcode
eleventyConfig.addShortcode('icon', (name, label) =>
  `<svg aria-label="${label}"><use href="/icons.svg#${name}"></use></svg>`
);

// Paired shortcode (wraps content)
eleventyConfig.addPairedShortcode('callout', (content, type = 'info') =>
  `<aside class="callout callout--${type}">${content}</aside>`
);
```

```njk
{% icon "star", "Star icon" %}

{% callout "warning" %}
  Watch out for this thing.
{% endcallout %}
```

Async shortcodes are supported with `addAsyncShortcode`.

## Passthrough File Copy

Copy static assets to the output directory without processing:

```js
// Copy entire directories
eleventyConfig.addPassthroughCopy('src/assets');
eleventyConfig.addPassthroughCopy('src/fonts');

// Copy specific file types
eleventyConfig.addPassthroughCopy('src/**/*.{jpg,png,svg,webp}');

// Remap output path
eleventyConfig.addPassthroughCopy({ 'src/robots.txt': 'robots.txt' });
```

Enable passthrough during `--serve` (avoids restarting the server for asset changes):

```js
eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
```

## Permalinks

Override default URL output in frontmatter or directory data:

```yaml
# Explicit path
permalink: /about/

# Dynamic path using template data
permalink: /blog/{{ page.date | date: "%Y/%m" }}/{{ page.fileSlug }}/

# Disable output (useful for data-only pages)
permalink: false
```

**Pagination permalinks:**

```yaml
pagination:
  data: collections.post
  size: 10
  alias: posts
permalink: /blog/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}
```

## Pagination

Paginate any array or object from the data cascade:

```yaml
---
pagination:
  data: collections.post
  size: 10
  alias: posts
  reverse: true
---
```

```njk
{% for post in posts %}
  <a href="{{ post.url }}">{{ post.data.title }}</a>
{% endfor %}

{% if pagination.href.previous %}
  <a href="{{ pagination.href.previous }}">Previous</a>
{% endif %}
{% if pagination.href.next %}
  <a href="{{ pagination.href.next }}">Next</a>
{% endif %}
```

## Official Plugins

### `@11ty/eleventy-img`

Optimizes and generates responsive images at build time:

```bash
npm install --save-dev @11ty/eleventy-img
```

```js
import Image from '@11ty/eleventy-img';

eleventyConfig.addAsyncShortcode('image', async (src, alt, sizes = '100vw') => {
  const metadata = await Image(src, {
    widths: [400, 800, 1200],
    formats: ['avif', 'webp', 'jpeg'],
    outputDir: './public/img/',
    urlPath: '/img/',
  });
  const attrs = { alt, sizes, loading: 'lazy', decoding: 'async' };
  return Image.generateHTML(metadata, attrs);
});
```

```njk
{% image "./src/assets/hero.jpg", "Hero image" %}
```

### `@11ty/eleventy-navigation`

Builds hierarchical nav from frontmatter:

```bash
npm install --save-dev @11ty/eleventy-navigation
```

```js
import navigationPlugin from '@11ty/eleventy-navigation';
eleventyConfig.addPlugin(navigationPlugin);
```

```yaml
---
eleventyNavigation:
  key: About
  parent: Home
  order: 2
---
```

```njk
{% set navPages = collections.all | eleventyNavigation %}
{% for entry in navPages %}
  <a href="{{ entry.url }}">{{ entry.title }}</a>
{% endfor %}
```

### `@11ty/eleventy-plugin-bundle`

Bundles CSS/JS inline or to a file — useful with Tailwind or custom CSS without a full bundler:

```bash
npm install --save-dev @11ty/eleventy-plugin-bundle
```

```js
import bundlePlugin from '@11ty/eleventy-plugin-bundle';
eleventyConfig.addPlugin(bundlePlugin);
```

```njk
{# Add to a bundle from any template #}
{% css %}
.highlight { background: yellow; }
{% endcss %}

{# Output the bundle in the layout #}
<style>{% getBundle "css" %}</style>
```

### `@11ty/eleventy-plugin-syntaxhighlight`

```bash
npm install --save-dev @11ty/eleventy-plugin-syntaxhighlight
```

```js
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
eleventyConfig.addPlugin(syntaxHighlight);
```

### RSS / Atom

```bash
npm install --save-dev @11ty/eleventy-plugin-rss
```

```js
import rssPlugin from '@11ty/eleventy-plugin-rss';
eleventyConfig.addPlugin(rssPlugin);
```

## Tailwind CSS Integration

Use `@11ty/eleventy-plugin-bundle` with a PostCSS transform, or run Tailwind as a separate process:

### Separate process (recommended)

```json
// package.json scripts
{
  "dev": "concurrently \"eleventy --serve\" \"tailwindcss -i src/css/main.css -o public/css/main.css --watch\"",
  "build": "tailwindcss -i src/css/main.css -o public/css/main.css && eleventy"
}
```

```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{njk,md,html,js}'],
};
```

## Transforms

Transforms receive the rendered output string and return a modified version. Useful for HTML minification:

```js
import htmlMinifier from 'html-minifier-terser';

eleventyConfig.addTransform('htmlmin', async (content, outputPath) => {
  if (!outputPath?.endsWith('.html')) return content;
  return htmlMinifier.minify(content, { collapseWhitespace: true, removeComments: true });
});
```

## Watch Targets

Eleventy watches `_includes/`, `_data/`, and all template files by default. Add external paths:

```js
eleventyConfig.addWatchTarget('./src/css/');
eleventyConfig.addWatchTarget('./tailwind.config.js');
```

## Ignoring Files

```js
// Ignore a directory or pattern
eleventyConfig.ignores.add('src/drafts/**');
```

Or use a `.eleventyignore` file (same syntax as `.gitignore`).

## `page` Object

Every template has access to a `page` object with Eleventy-supplied metadata:

| Property           | Value                                      |
|--------------------|--------------------------------------------|
| `page.url`         | Output URL (e.g. `/blog/my-post/`)         |
| `page.fileSlug`    | Input filename without extension            |
| `page.filePathStem`| Input path without extension               |
| `page.date`        | Date (JS Date object)                      |
| `page.inputPath`   | Relative path to source file               |
| `page.outputPath`  | Relative path to output file               |
| `page.lang`        | Language (when i18n plugin is active)      |

## Official Best Practices

- ✅ Use `eleventy.config.js` (ESM) rather than `.eleventy.js` (CJS) for new projects.
- ✅ Prefer Nunjucks for layouts and HTML-heavy templates; use Markdown only for content.
- ✅ Set shared layout and tags in directory data files (`posts.json`) rather than repeating frontmatter on every file.
- ✅ Use `eleventyComputed` for derived data so it stays up-to-date as other data changes.
- ✅ Use `@11ty/eleventy-img` for all `<img>` output — it handles formats, sizes, and lazy loading.
- ✅ Use passthrough copy for static assets; set `setServerPassthroughCopyBehavior('passthrough')` for fast dev reloads.
- ✅ Keep layouts thin — put shared HTML in `base.njk` and extend it via layout chaining.

## Do Not

- ❌ Process images with `addPassthroughCopy` when `@11ty/eleventy-img` could optimize them — raw image passthrough skips compression and responsive generation.
- ❌ Put logic-heavy code in Nunjucks templates — move it into filters, shortcodes, or global data files where it can be tested and reused.
- ❌ Use template-language-specific syntax in layout files if the project mixes engines — use the engine you set as `markdownTemplateEngine`.
- ❌ Rely on `collections.all` sort order without an explicit sort — the default is input-file order, which is not guaranteed across environments.
- ❌ Add large dependencies to `_data/` async fetch functions without caching — they run on every build; use Eleventy's fetch caching (`@11ty/eleventy-fetch`) for external API calls.
- ❌ Use `| safe` on untrusted user content — it disables HTML escaping and creates XSS risk.
