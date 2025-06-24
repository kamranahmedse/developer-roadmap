# Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

Visit the following resources to learn more:

- [@official@Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [@video@React Context API Crash Course](https://www.youtube.com/watch?v=t9WmZFnE6Hg)
- [@article@State with useContext and useState/useReducer](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/)
