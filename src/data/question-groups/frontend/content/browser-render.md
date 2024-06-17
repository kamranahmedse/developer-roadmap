The process of rendering a web page in the browser involves several steps:

1. Parsing the HTML.
2. Parsing the CSS and applying styles.
3. Calculating the position of each element in the layout of the page.
4. Painting the actual pixels in the screen, while at the same time sorting them into layers.
5. Composing all layers together, to render the website on screen. This step is taking into account z-index values, opacity values and more.
6. Running JavaScript code.
7. Loading the asynchronous resources.
