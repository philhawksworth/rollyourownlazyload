
// Make it simple to swap parts of a UTR attribute on an element
function updateAttributeURL(element, attr, swapOut, swapIn) {
  var url = element.getAttribute(attr);
  url = url.replace(swapOut, swapIn);
  element.setAttribute(attr, url);
}


// Update the image source on elements in the picture element
function loadImage(picture) {

  var sources = picture.children;
  var loadingPath = "images/tiny";
  var sizes = ["large","medium","small"];

  for(var el=0; el<sources.length; el++) {
    // update the src or srcset urls
    if(el == sources.length-1) {
      updateAttributeURL(sources[el], "src", loadingPath, "images/"+sizes[el] );
    } else {
      updateAttributeURL(sources[el], "srcset", loadingPath, "images/"+sizes[el] );
    }
    // remove the lazy-initial class when the fulll image is loaded
    sources[el].addEventListener('load', image => {
      image.target.closest("picture").classList.remove("lazy-initial")
    }, false);
  }

}

// Stop observing this image and load its source
function lazyLoad(elements) {
  elements.forEach(item => {
    if (item.intersectionRatio > 0) {
      observer.unobserve(item.target);
      loadImage(item.target);
    };
  });
};


// Set up the intersection observer to detect when to define
// and load the real image source
var options = {
  rootMargin: '20px',
  threshold: 1.0
};
var observer = new IntersectionObserver(lazyLoad, options);

// Watch for all pictures with a "lazy" class
var pictures = document.querySelectorAll('picture.lazy');
pictures.forEach(pic => {
  observer.observe(pic);
});
