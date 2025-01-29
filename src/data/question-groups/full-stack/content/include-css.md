There are two main ways to include CSS into your HTML, you can either do it “inline” or you can do it with the “style” tag.

**Inline**: Add `style` directly in an HTML element.

`<p style="color: red;">Hello</p>`

**Internal**: Use a `<style>` tag in the `<head>`.

`<style>`  
  `p { color: red; }`  
`</style>`

1. 

**External**: Link a CSS file using `<link>` in the `<head>`.  
`<link rel="stylesheet" href="styles.css">`  