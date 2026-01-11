# Semantic HTML Mastery

Semantic HTML is the foundation of accessibility. Correct element choice communicates meaning to browsers, assistive technologies, and search engines—without requiring extra ARIA attributes.

**Critical Element Choices**:
- `<button>` for actions, `<a>` for navigation
- `<nav>`, `<main>`, `<aside>`, `<footer>` for landmarks
- `<h1>`-`<h6>` for heading hierarchy (one h1 per page)
- `<ul>`/`<ol>` for lists, `<table>` for tabular data
- `<label>` properly associated with inputs

**Why It Matters**:
- Screen readers announce element roles automatically
- Keyboard navigation works without JavaScript
- SEO benefits from proper structure
- Future-proof—browsers enhance semantic elements

**Common Mistakes**:
- `<div onclick>` instead of `<button>`
- Skipping heading levels (h1 → h3)
- Using `<a>` without `href`
- `<table>` for layout instead of data

**The First Rule**: When an HTML element provides the semantics you need, use it. Only reach for ARIA when HTML alone isn't sufficient.

Visit the following resources to learn more:

- [@article@HTML: A good basis for accessibility - MDN](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [@article@Semantic Structure - WebAIM](https://webaim.org/techniques/semanticstructure/)
- [@video@Semantic HTML Explained](https://www.youtube.com/watch?v=qYPq5P9s5FY)
