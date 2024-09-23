# Rendering

React follows a declarative approach to rendering components, which means that developers specify what a component should look like, and React takes care of rendering the component to the screen. This is in contrast to an imperative approach, where developers would write code to manually manipulate the DOM (Document Object Model) to update the UI.

The virtual DOM (VDOM) is an important aspect of how React works. It is a lightweight in-memory representation of the DOM (Document Object Model), and it is used to optimize the rendering of components in a React application.

- Components are written as JavaScript classes or functions that define a render method. The render method returns a description of what the component should look like, using JSX syntax.
- When a component is rendered, React creates a virtual DOM (VDOM) representation of the component. The VDOM is a lightweight in-memory representation of the DOM, and it is used to optimize the rendering of components.
- React compares the VDOM representation of the component with the previous VDOM representation (if it exists). If there are differences between the two VDOMs, React calculates the minimum number of DOM updates needed to bring the actual DOM into line with the new VDOM.
- React updates the actual DOM with the minimum number of DOM updates needed to reflect the changes in the VDOM.

This process is known as reconciliation, and it is an important aspect of how React works. By using a declarative approach and a VDOM, React is able to optimize the rendering of components and improve the performance of web applications.

Visit the following resources to learn more:

- [@official@Render and Commit - Official Docs](https://react.dev/learn/render-and-commit)
- [@article@Rendering in React - ui.dev](https://ui.dev/why-react-renders)
- [@article@Fix the slow render before you fix the re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)
