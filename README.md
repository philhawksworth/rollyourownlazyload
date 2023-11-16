# Example: Lazy loading without a framework

This is an example site to demonstrate how to create your own lazy loading. It uses [Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/?utm_source=github&utm_medium=icdn-example-pnh&utm_campaign=devex) for serving, optimising, and transforming images on-the-fly to populate different source images in picture elements.


[![Netlify Status](https://api.netlify.com/api/v1/badges/9b92cf5e-5161-406d-8785-6eaf5a04a241/deploy-status)](https://app.netlify.com/sites/lazy-load-demo/deploys)


## Local development

To build the site you need:

- [Node](https://nodejs.org) - to run the build
- [Netlify CLI](https://cli.netlify.com) - to run Netlify tools locally with `netlify dev`


### Getting started

```bash

# clone this repository
git clone git@github.com:philhawksworth/rollyourownlazyload.git

# go to the working directory
cd rollyourownlazyload

# install dependencies
npm i

# start a local build server with hot reloading and Netlify redirects proxying
netlify dev
```
