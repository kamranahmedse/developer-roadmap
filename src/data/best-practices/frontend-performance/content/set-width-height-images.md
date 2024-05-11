# Image Dimensions

> Set width and height attributes on `<img>` if the final rendered image size is known.

If height and width are set, the space required for the image is reserved when the page is loaded. However, without these attributes, the browser does not know the size of the image, and cannot reserve the appropriate space to it. The effect will be that the page layout will change during loading (while the images load).
