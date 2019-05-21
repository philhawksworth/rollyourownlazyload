---
title: Lightweight lazy loading with Netlify Large Media
layout: default
---

{% set somePhotos = [
  {url: "lighthouse-5.jpg", credit: "ezgi yıldırım", creditURL: "https://unsplash.com/photos/Ej1mWW2cd6Q"}
] %}
<section class="post-teaser">
{%- for photo in somePhotos %}
  <div class="credit">By <a href="{{ photo.creditURL }}" target="_BLANK" rel="noopener"> {{ photo.credit }}</a>, (<a href="/images/original/{{ photo.url }}" target="_BLANK" rel="noopener">Original</a>)</div>
  {% lazypicture photo.url, "Yummy cake" %}
{%- endfor -%}
</section >

Take a look at [the code on GitHub]({{ pkg.repository.url }}), or read on, for more explanation and examples.

## Image transformation

By managing our source image asset files with [Netlify Large Media](https://www.netlify.com/features/large-media/), we can take advantage of the ability to perform on-the-fly [image transformations](https://www.netlify.com/docs/image-transformation/) to deliver resized and cropped versions of the images directly from [Netlify's ADN](https://www.netlify.com/features/adn/).

Netlify transforms and caches image assets if we add querystring parameters to our image src URLs.

For example, the image below can bew served in any size:

- [lighthouse-5.jpg?nf_resize=fit&w=20](/images/lighthouse-5.jpg?nf_resize=fit&w=20)
- [lighthouse-5.jpg?nf_resize=fit&w=500](/images/lighthouse-5.jpg?nf_resize=fit&w=500)
- [lighthouse-5.jpg?nf_resize=fit&w=600](/images/lighthouse-5.jpg?nf_resize=fit&w=600)

## Abstract with helper URLs

To clean these URLs up a little, we can use [Netlify's Redirects API](https://www.netlify.com/docs/redirects/) to create some more friendly and abstracted URLs which [proxy]({{ pkg.repository.url }}/blob/master/netlify.toml) to the querystring decorated URLs:

- [/images/tiny/lighthouse-5.jpg](/images/tiny/lighthouse-5.jpg) ( → [lighthouse-5.jpg?nf_resize=fit&w=20](/images/lighthouse-5.jpg?nf_resize=fit&w=20) )
- [/images/small/lighthouse-5.jpg](/images/small/lighthouse-5.jpg) (→ [lighthouse-5.jpg?nf_resize=fit&w=500](/images/lighthouse-5.jpg?nf_resize=fit&w=500) )
- [/images/original/lighthouse-5.jpg](/images/original/lighthouse-5.jpg) ( → [lighthouse-5.jpg](/images/lighthouse-5.jpg) )

The [redirects config](({{ pkg.repository.url }}/blob/master/netlify.toml)) uses fully qualified URLs here, so that we can see the same transformations while developing locally with [Netlify Dev](https://netlify.com/products/dev)

## Using the picture element

These images have been added to the page in various sizes, using the picture element with multiple image sources.

{% set somePhotos = [
  {url: "lighthouse-4.jpg", credit: "Charlota Blunarova", creditURL: "https://unsplash.com/photos/of4r2gHpCqU"},
  {url: "lighthouse-3.jpg", credit: "Jesse Orrico", creditURL: "https://unsplash.com/photos/5xWf-gE_45U"},
  {url: "lighthouse-2.jpg", credit: "Youjeen Cho", creditURL: "https://unsplash.com/photos/kNxB07EA9r4"},
  {url: "lighthouse-1.jpg", credit: "Chris Meads", creditURL: "https://unsplash.com/photos/9FidI-IQxwY"}
] %}

<section class="post-teaser">
{%- for photo in somePhotos %}
  <div class="credit">By <a href="{{ photo.creditURL }}" target="_BLANK" rel="noopener"> {{ photo.credit }}</a>, (<a href="/images/original/{{ photo.url }}" target="_BLANK" rel="noopener">Original</a>)</div>
  {% lazypicture photo.url, "Yummy cake" %}
{%- endfor -%}
</section >


## A picture helper

Whatever tool you use to generate your HTML, chances are that it includes a facility to make shortcodes or macros.

This example uses a static site generator called [11ty](https://www.11ty.io) which gives us the ability to make a [shortcode](https://www.11ty.io/docs/shortcodes/) to output picture tags with many image source attributes including  transformation parameters automatically added to the image urls.

This shortcode:

```html
{%- raw -%}
{% lazypicture lighthouse.jpg "A lighthouse" %}
{% endraw %}
```

outputs this html:

```html
<picture class="lazy lazy-initial">
  <source srcset="/images/tiny/lighthouse.jpg" media="(min-width: 1200px)">
  <source srcset="/images/tiny/lighthouse.jpg" media="(min-width: 740px)">
  <img src="/images/tiny/lighthouse.jpg" alt="Yummy cake" />
</picture>
```

This sets _each image source_ to use a tiny (typically less that 1k) version of the image. With some CSS, we size the image to fit and add some blurring to smooth it all down nicely.

Then, thanks to the magic of the browser's [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). We can detect when our images come into the viewport, and [use JavaScript to update our image sources](({{ pkg.repository.url }}/blob/master/src/js/lazy.js)) to use more appropriately sized simages in our responsive picture element.

Removing the CSS class which applies the blur once our new image source is loaded completes the effect.

## Get started with Netlify Large Media

Need some reference code to get you going? You can clone [the code for this site]({{ pkg.repository.url }}) to use as an example.

Once cloned, you can find examples and documentation on how to configure [Netlify Large Media](https://www.netlify.com/features/large-media/), in [the docs](https://www.netlify.com/docs/large-media/).

