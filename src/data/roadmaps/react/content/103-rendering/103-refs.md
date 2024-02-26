# Refs

Refs provide a way to access DOM nodes or React elements created in the render method.

In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

Visit the following resources to learn more:

- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [Examples of using refs in React](https://www.robinwieruch.de/react-ref/)
- [The Complete Guide to useRef() and Refs in React](https://dmitripavlutin.com/react-useref-guide/)
- [What Exactly Are Refs? - React - CodeGuage](https://www.codeguage.com/courses/react/refs)
- [Learn useRef in 11 Minutes - Web Dev Simplified](https://www.youtube.com/watch?v=t2ypzz6gJm0)
