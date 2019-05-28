# Example: Netlify Large Media and picture

This is an example site to demonstrate the use of Netlify Large Media for managing source image assets and serving image transformations on-the-fly to populate different source images in picture elements.


## Local development

To build the site you need:

- [Node](https://nodejs.org) - to run the build
- [Yarn](https://yarnpkg.com) - to install and manage dependencies


### Getting started

```bash

# clone this repository
git clone git@github.com:https://github.com/philhawksworth/lazy-load-with-nlm.git

# go to the working directory
cd lazy-load-with-nlm

# install dependencies
yarn

# start a local build server with hot reloading and Netlify redirects proxying
netlify dev
```

### Configuring your own Netlify Large Media workflow

After cloning this repo, you can set it up as a site of your own on Netlify, and configure the Netlify Large Media pipeline by following the [guidance in the docs](https://www.netlify.com/docs/large-media/)
