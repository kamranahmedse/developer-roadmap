![Virtual DOM](https://assets.roadmap.sh/guest/virtual-dom-example-7ynkg.png)

The way the virtual DOM works is the following:

1. The entire user interface is copied into an in-memory structure called “virtual DOM”, which is a lightweight version of the actual DOM.
2. When state changes and the UI needs to be updated, a new virtual DOM is created with the updated state.
3. Then a diff is made between the new virtual DOM and the previous version.
4. The system will then calculate the least amount of changes required to achieve the new state, and it’ll apply those changes. Only the nodes that need to be updated are touched, which minimizes direct manipulation of the real DOM.

As for advantages:

- **Performance optimization**: By only updating specific nodes within the real DOM, this technique reduces the number of updates, reflows and repaints on the UI. Directly affecting the performance of the app.
- **Cross-platform**. The virtual DOM provides a layer of abstraction between the application and the actual API that renders the UI. This means the app can be ported into other platforms as long as there is a virtual DOM implementation for that platform.
- **Consistency**. This technique keeps the UI in sync with the internal state, reducing bugs and inconsistencies.
