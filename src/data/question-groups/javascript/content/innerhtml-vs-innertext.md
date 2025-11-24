## Advanced concepts

innerHTML is what you use to get or change the HTML content of an element. It shows you the plain text and the HTML tags used to create the text. For example, if you have a paragraph with an italics tag, innerHTML will show the em tags in the final result.

```html
<p id="text">
  <em>
      JavaScript interview questions
 </em>
</p>
```

```javascript
let textOne = document.getElementById("text");

console.log(textOne.innerHTML); // <em>JavaScript interview questions</em>
```

On the other hand, innerText gets or changes the plain text inside an element. It shows you the text on the page but not the HTML tags used to create the text.

```html
<p id="text">
  <em>
      JavaScript interview questions
 </em>
</p>
```

```javascript
let textOne = document.getElementById("text");

console.log(textOne.innerText); // JavaScript interview questions
``` 