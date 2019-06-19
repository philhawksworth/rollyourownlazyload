# Example: Lazy loading without a heavy framework

This is an example site to demonstrate how to create your own lazy loading. It uses Netlify Large Media for managing source image assets and serving image transformations on-the-fly to populate different source images in picture elements.


[![Netlify Status](https://api.netlify.com/api/v1/badges/9b92cf5e-5161-406d-8785-6eaf5a04a241/deploy-status)](https://app.netlify.com/sites/lazy-load-demo/deploys)


## Local development

To build the site you need:

- [Node](https://nodejs.org) - to run the build
- [Yarn](https://yarnpkg.com) - to install and manage dependencies


### Getting started

```bash

# clone this repository
git clone git@github.com:philhawksworth/rollyourownlazyload.git

# go to the working directory
cd rollyourownlazyload

# install dependencies
yarn

# start a local build server with hot reloading and Netlify redirects proxying
netlify dev
```

### Configuring your own Netlify Large Media workflow

After cloning this repo, you can set it up as a site of your own on Netlify, and configure the Netlify Large Media pipeline by following the [guidance in the docs](https://www.netlify.com/docs/large-media/)
