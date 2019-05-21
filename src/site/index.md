---
title: Lightweight lazy loading with Netlify Large Media
layout: default
---


## Image transformation

If you manage your source image asset files with [Netlify Large Media](https://www.netlify.com/features/large-media/), you can take advantage of the ability to perform on-the-fly [image transformations](https://www.netlify.com/docs/image-transformation/) to deliver resized and cropped versions of the images directly from [Netlify's ADN](https://www.netlify.com/features/adn/).

Netlify transforms and caches your image assets if you add querystring parameters to your image src URLs.

For example, the image below in various sizes:

- [lighthouse-5.jpg?nf_resize=fit&w=500](/images/lighthouse-5.jpg?nf_resize=fit&w=500)
- [lighthouse-5.jpg?nf_resize=fit&w=600](/images/lighthouse-5.jpg?nf_resize=fit&w=600)
- [lighthouse-5.jpg?nf_resize=fit&w=800](/images/lighthouse-5.jpg?nf_resize=fit&w=800)

To clean these URLs up a little, we can use [Netlify's Redirects API](https://www.netlify.com/docs/redirects/) to create some more friendly and abstracted URLs which [proxy]({{ pkg.repository.url }}/blob/master/netlify.toml) to the querystring decorated URLs:

- [/images/tiny/lighthouse-5.jpg](/images/tiny/lighthouse-5.jpg) ( → [lighthouse-5.jpg?nf_resize=fit&w=20](/images/lighthouse-5.jpg?nf_resize=fit&w=20) )
- [/images/small/lighthouse-5.jpg](/images/small/lighthouse-5.jpg) (→ [lighthouse-5.jpg?nf_resize=fit&w=500](/images/lighthouse-5.jpg?nf_resize=fit&w=500) )
- [/images/original/lighthouse-5.jpg](/images/original/lighthouse-5.jpg) ( → [lighthouse-5.jpg](/images/lighthouse-5.jpg) )


## Using the picture element

These images have been added to the page in various sizes, using the picture element with multiple image sources.

{% set somePhotos = [
  {url: "lighthouse-1.jpg", credit: "Chris Meads", creditURL: "https://unsplash.com/photos/9FidI-IQxwY"},
  {url: "lighthouse-2.jpg", credit: "Youjeen Cho", creditURL: "https://unsplash.com/photos/kNxB07EA9r4"},
  {url: "lighthouse-3.jpg", credit: "Jesse Orrico", creditURL: "https://unsplash.com/photos/5xWf-gE_45U"},
  {url: "lighthouse-4.jpg", credit: "Charlota Blunarova", creditURL: "https://unsplash.com/photos/of4r2gHpCqU"},
  {url: "lighthouse-5.jpg", credit: "ezgi yıldırım", creditURL: "https://unsplash.com/photos/Ej1mWW2cd6Q"}
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
{% picture photo.jpg "Yummy cake" %}
{% endraw %}
```

outputs this html:

```html
<picture>
  <source srcset="/images/photo.jpg?nf_resize=fit&w=700" media="(min-width: 1200px)">
  <source srcset="/images/photo.jpg?nf_resize=fit&w=600" media="(min-width: 740px)">
  <img src="/images/photo.jpg?nf_resize=fit&w=500" alt="Yummy cake" />
</picture>
```


## Get started with Netlify Large Media

Need some reference code to get you going? You can clone [the code for this site]({{ pkg.repository.url }}) to use as an example.

Once cloned, you can find examples and documentation on how to configure [Netlify Large Media](https://www.netlify.com/features/large-media/), in [the docs](https://www.netlify.com/docs/large-media/).

