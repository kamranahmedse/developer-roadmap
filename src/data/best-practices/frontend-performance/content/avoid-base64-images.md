# Avoid Base64 Images

> You could eventually convert tiny images to base64 but it's actually not the best practice.

Using Base64 encoded images in your frontend can have several drawbacks.

First, Base64 encoded images are larger in size than their binary counterparts, which can slow down the loading time of your website.

Second, because Base64 encoded images are embedded directly in the HTML or CSS, they are included in the initial page load, which can cause delays for users with slower internet connections.

Third, Base64 encoded images do not benefit from browser caching, as they are part of the HTML or CSS and not a separate resource. So, every time the page is loaded, the images will be re-downloaded, even if the user has visited the page before.

Fourth, Base64 encoded images are not compatible with some old browser versions.

Instead of using Base64 encoded images, it is generally recommended to use binary image files and reference them using an img tag in HTML, with a standard src attribute. This allows the browser to cache the image and use it for subsequent page loads, resulting in faster loading times and better user experience.

- [Base64 Encoding & Performance, Part 1 and 2 by Harry Roberts](https://csswizardry.com/2017/02/base64-encoding-and-performance/)
- [A closer look at Base64 image performance – The Page Not Found Blog](http://www.andygup.net/a-closer-look-at-base64-image-performance/)
- [When to base64 encode images (and when not to) | David Calhoun](https://www.davidbcalhoun.com/2011/when-to-base64-encode-images-and-when-not-to/)
- [Base64 encoding images for faster pages | Performance and seo factors](https://varvy.com/pagespeed/base64-images.html)
