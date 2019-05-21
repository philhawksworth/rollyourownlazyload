// Generate a picture tag with just one tiny image src URL which used Netlify image transforms
// this will be our initial image to be progressively enhanced to load larger images

module.exports = (url, alt = "Missing alt text") => {
  return `<picture class="lazy lazy-initial">
  <source srcset="/images/tiny/${url}" media="(min-width: 1200px)">
  <source srcset="/images/tiny/${url}" media="(min-width: 740px)">
  <img src="/images/tiny/${url}" alt="${alt}" /></picture>`;
};


