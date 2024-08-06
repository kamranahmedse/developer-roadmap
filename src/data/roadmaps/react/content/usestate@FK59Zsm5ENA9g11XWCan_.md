# useState Hook

useState is a hook. 
What is hook? - Hooks are functions starting with use which can only be called at the top level of your component. You can't call Hooks inside conditions, loops or other nested functions. Hooks are functions, but it's helpful to think of them as unconditional declarations about your component's needs. You "use" React features at the top of your component similar to how you "import" modules at top of your file. Multiple hooks are acceptable.
Now what is useState hook? - `useState` hook is used to manage the state of a component in functional components. Calling `useState` returns an array with two elements: the current state value and a function to update the state.

example - 
const [index, setIndex] = useState(0);


Visit the following resources to learn more:

- [@official@Using the State Hook](https://react.dev/reference/react/useState)
- [@article@React useState Hook by Example](https://www.robinwieruch.de/react-usestate-hook/)
