In React you have two different ways to handle state, depending on the scope of the data inside that state. 

If the scope is local, then you can handle it through a simple `useState` hook inside the component itself. 

If on the other hand, you need to store a global state which is accessible for many components, then you can use something like the `Context API` or specific state libraries like Redux, MobX or Zustand.

The way state handling works in React (in general terms) works like this:

* State is updated via actions (e.g., event handlers).  
* Updated state triggers re-renders to reflect changes in the UI.  
* Avoid excessive re-renders by optimizing context or using memoization (`React.memo`, `useMemo`).