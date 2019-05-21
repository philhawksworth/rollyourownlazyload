module.exports = function(config) {

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // syntax highlighting plugin
  const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
  config.addPlugin(syntaxHighlightPlugin, {
    templateFormats: "md"
  });


  // minify the html output when building for realz
  if(process.env.ELEVENTY_ENV == 'prod') {
    config.addTransform("htmlmin", require("./src/utils/minify-html.js"));
  }

  // A responsive image helper using Netlify Large Media - image transformation
  config.addShortcode("picture", require("./src/utils/picture.js"));
  // A lazy loading image helper using Netlify Large Media - image transformation
  config.addShortcode("lazypicture", require("./src/utils/lazy-picture.js"));

  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");


  return {
    dir: {
      input: "src/site",
      output: "dist"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
