# Context

Context is a built-in React feature that lets you share data across the component tree without passing it through props at every level. You create a context, provide a value at some point in the tree, and any component below can read that value with useContext. It works well for data that does not change often, like theme or authentication status, but is not designed to replace a full state management library for frequently changing data.

Visit the following resources to learn more:

- [@official@Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [@article@State with useContext and useState/useReducer](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/)
- [@video@React Context API Crash Course](https://www.youtube.com/watch?v=t9WmZFnE6Hg)