## Advanced concepts

There are several methods to manipulate HTML elements using CSS style selectors. But I'll be using the `document.getElementById` to style a paragraph element with an `ID="styleP"`

```html
<p id="styleP">
      Top JavaScript interview questions for web developers
</p>
```

```javascript
// Get the HTML element with the ID "styleP"

const styleP = document.getElementById("styleP");


// Apply styles to the element

styleP.style.color = "red"; 
styleP.style.border = "3px solid black";

console.log(styleP.style); 