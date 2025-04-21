---
order: 1
briefTitle: 'React'
briefDescription: 'Test, rate and improve your React knowledge with these questions.'
title: 'React Questions'
description: 'Test, rate and improve your React knowledge with these questions.'
isNew: false
seo:
  title: 'React Questions'
  description: 'Curated list of React questions to test, rate and improve your knowledge. Questions are based on real world experience and knowledge.'
  ogImageUrl: 'https://assets.roadmap.sh/guest/react-questions-x6n2w.jpg'
  keywords:
    - 'react quiz'
    - 'react questions'
    - 'react interview questions'
    - 'react interview'
    - 'react test'
sitemap:
  priority: 1
  changefreq: 'monthly'
questions:
  - question: What is a React?
    answer: React, is an open-source JavaScript library for building user interfaces (UIs). It was developed and is maintained by Meta, and is widely used by developers to create interactive and dynamic web applications.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are the features of React?
    answer: Use of Virtual DOM instead of Real DOM, JSX, Server-side rendering, Unidirectional data flow or data binding, Reusable components, etc.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is JSX?
    answer: JSX is a syntax extension to JavaScript and comes with the full power of JavaScript. JSX produces React “elements”. You can embed any JavaScript expression in JSX by wrapping it in curly braces. After compilation, JSX expressions become regular JavaScript objects.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between Real DOM and Virtual DOM?
    answer: |
      Virtual DOM is the representation of a UI in the form of a plain JavaScript object. It is a node tree that lists the elements, their attributes and content as Objects and their properties. Real DOM is the real representation of a UI which can be seen and inspected in the browser.
      Manipulating the virtual DOM is much faster than real DOM, because nothing gets drawn on the screen. React uses this virtual DOM to figure out the most efficient way to update the browser DOM.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between state and props?
    answer: |
      Props are used to pass data from parent to child. They are like function arguments. They are immutable.
      State is managed within the component and is mutable.
    topics:
      - 'State'
      - 'Beginner'
  - question: Can we change the state of the component directly?
    answer: No, we can't change the state of the component directly. State can only be changed by using `setState()` method. Changing the state variable directly won't re-render the component.
    topics:
      - 'State'
      - 'Beginner'
  - question: What is the difference between controlled and uncontrolled components?
    answer: controlled-vs-uncontrolled.md
    topics:
      - 'State'
      - 'Beginner'
  - question: What are different options to style a React component?
    answer: CSS Stylesheets, Inline styles, CSS Modules, Styled Components, CSS in JS libraries, etc.
    topics:
      - 'Styling'
      - 'Beginner'
  - question: What are Pure Components?
    answer: pure-components.md
    topics:
      - 'Performance'
      - 'Intermediate'
  - question: What are Synthetic Events in React?
    answer: synthetic-events.md
    topics:
      - 'Events'
      - 'Intermediate'
  - question: What is the purpose of `key` attribute in React?
    answer: The string attribute `key` is a special attribute you need to include when rendering an array of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.
    topics:
      - 'Performance'
      - 'Beginner'
  - question: What are refs in React?
    answer: |
      Refs are used to get reference to a DOM node or an instance of a component. They help to access the DOM nodes or React elements created in the render method.
      You can also use refs when you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is ref forwarding in React?
    answer: ref-forwarding.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is React Fiber?
    answer: |
      React fiber is the reconciliation engine that replaced the core algorithm in React v16. It is a rewrite of the core algorithm, responsible for scheduling what gets rendered on screen. It is a set of algorithms for efficiently updating the UI.
      Here is a [bit-outdated but quite good article about React Fiber](https://github.com/acdlite/react-fiber-architecture).
    topics:
      - 'Core'
      - 'Advanced'
  - question: What is the difference between react and react-dom packages?
    answer: |
      React is a library for building user interfaces. The package `react` contains only the renderer-agnostic code i.e. the core React library, algorithm for computing changes in the UI and other helpers. The package `react-dom` contains the code specific to the DOM rendering of React components.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between class components and function components?
    answer: |
      Class components let you define your components with the help of classes. You can extend from `React.Component` class to create a component. Class components also allow you to define component level lifecycle methods.
      Function components are defined by writing a function which returns a React element. Functional components are the preferred way to write React components. There are no lifecycle methods similar to class components available in functional components; you can use React hooks instead to manage the component lifecycle.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are Higher-Order Components (HOCs)?
    answer: |
      A higher-order component (HOC) is a function that takes a component and returns a new component. Basically, it's a pattern that is derived from React's compositional nature.
      Higher-Order Components are not part of the React API. They are the pattern that emerges from React's compositional nature.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What are React Hooks?
    answer: |
      Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don't work inside classes — they let you use React without classes. Some common hooks include `useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`, etc.
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to render HTML in React?
    answer: |
      You can use `dangerouslySetInnerHTML` prop to render HTML in React. It is used to set HTML directly from React. You should be careful while using this property as it can cause XSS attacks.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is Context in React?
    answer: |
      Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context is primarily used when some data needs to be accessible by many components at different nesting levels.
    topics:
      - 'State'
      - 'Intermediate'
  - question: What is Reconciliation in React?
    answer: |
      Reconciliation is the process through which React updates the DOM by comparing the newly returned elements with the previously rendered ones. React updates the DOM when a component's state changes.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What could be the reasons for un-necessary re-renders in React?
    answer: re-renders.md
    topics:
      - 'Performance'
      - 'Intermediate'
  - question: How does React handle prop drilling, and what are the downsides of excessive prop drilling?
    answer: Prop drilling is the process of passing data from a parent component to deeply nested child components through props. While React doesn't prohibit this, it can lead to code that is hard to maintain and understand. Excessive prop drilling can make it challenging to track data flow and can result in unnecessary re-renders. To mitigate these issues, you can use Context API or state management libraries like Redux.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the purpose of the `useEffect` hook in React?
    answer: |
      The useEffect hook in React is used for performing side effects in functional components. Side effects can include data fetching, DOM manipulation, and subscribing to external data sources.
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is the purpose of the `useContext` hook in React?
    answer: |
      The useContext hook is used to access and consume context values in functional components. It provides a way to access context data without the need for a context consumer. useContext is particularly useful when you want to access context values in nested components without having to pass props through intermediate components.
    topics:
      - 'State'
      - 'Intermediate'
  - question: What is the purpose of the `useMemo` hook in React?
    answer: |
      The `useMemo` hook is used to memoize the result of a computationally expensive operation in a functional component. It helps optimize performance by caching the result of the operation and returning the cached result on subsequent renders if the dependencies have not changed. This can prevent unnecessary calculations.
    topics:
      - 'Performance'
      - 'Intermediate'
  - question: Explain the concept of error boundaries in React.
    answer: error-boundaries.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: What are fragments in React?
    answer: |
      React doesn't allow returning multiple elements from a component. You can use fragments to return multiple elements.

      Fragments in React allow for a group of elements to be returned from a component's render method without adding an extra node to the DOM. They are useful when you want to return multiple elements without wrapping them in a parent container.
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are portals in React?
    answer: create-portal.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is Concurrent React (Concurrent Mode)?
    answer: |
      Concurrent React, previously referred to as Concurrent Mode, is a set of new features in React that allows React to interrupt the rendering process to consider more urgent tasks, making it possible for React to be more responsive to user input and produce smoother user experiences. It lets React keep the UI responsive while rendering large component trees by splitting the rendering work into smaller chunks and spreading it over multiple frames.
    topics:
      - 'Performance'
      - 'Intermediate'
  - question: What is the `useTransition` hook?
    answer: use-transition.md
    topics:
      - 'Performance'
      - 'Advanced'
  - question: What is the purpose of `flushSync` in React?
    answer: flush-sync.md
    topics:
      - 'Core'
      - 'Advanced'
  - question: How to render React components as static HTML string?
    answer: |
      The `renderToString` function in React is part of the `react-dom/server` package and is used to render React components on the server-side to a static HTML string. It is commonly used for server-side rendering (SSR) in React.
    topics:
      - 'SSR'
      - 'Intermediate'
  - question: What are Server Components in React?
    answer: |
      Server Components allow developers to write components that render on the server instead of the client. Unlike traditional components, Server Components do not have a client-side runtime, meaning they result in a smaller bundle size and faster loads. They can seamlessly integrate with client components and can fetch data directly from the backend without the need for an API layer. This enables developers to build rich, interactive apps with less client-side code, improving performance and developer experience.
    topics:
      - 'SSR'
      - 'Intermediate'
  - question: How to lazy load components in React?
    answer: lazy-loading.md
    topics:
      - 'Performance'
      - 'Intermediate'
  - question: What is `Suspense` in React?
    answer: suspense.md
    topics:
      - 'UX'
      - 'Intermediate'
  - question: How does React Virtual DOM work?
    answer: virtual-dom.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: How do Server Components differ from Client Components?
    answer: Server Components are rendered on the server and do not require client-side JavaScript for rendering. While Server Components and Client components can coexist in the same app, Server Components can import and render Client components.
    topics:
      - 'SSR'
      - 'Beginner'
  - question: How do React Server Components handle data fetching?
    answer: Server Components can directly access backend resources, databases, or filesystems to fetch data during rendering, eliminating the need for a separate API layer for data fetching.
    topics:
      - 'SSR'
      - 'Beginner'
  - question: What's the component's lifecycle in React?
    answer: component-lifecycle.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to write a comment in React?
    answer: |
      You can write a comment in JSX by wrapping it in curly braces and using JavaScript's multi-line comment syntax.
      ```js
      {/* This is a comment */}
      ```
    topics:
      - 'Core'
      - 'Beginner'
  - question: What is the difference between stateful and stateless components?
    answer: |
      The main difference between stateful and stateless components is one has state and the other doesn't. Stateful components keep track of changes to their state and re-render themselves when the state changes. Stateless components, on the other hand, render whatever is passed to them via `props` or always render the same thing.
    topics:
      - 'Core'
      - 'Beginner'
  - question: Why you shouldn't use `index` as a key in React lists and iterators?
    answer: Using `index` as a key can negatively impact performance and may cause issues with the component state. When the list items change due to additions, deletions, or reordering, using indexes can lead to unnecessary re-renders or even incorrect UI updates. React uses keys to identify elements in the list, and if the key is just an index, it might reuse component instances and state inappropriately. Especially in cases where the list is dynamic or items can be reordered, it's recommended to use unique and stable identifiers as keys to ensure consistent behavior.
    topics:
      - 'Performance'
      - 'Beginner'
  - question: What is the naming convention for React components?
    answer: In React, the naming convention for components is to use PascalCase, meaning the first letter of each word in the component's name should be capitalized. For example, `UserProfile`, `SidebarItem`, or `NavigationMenu`. This convention differentiates custom React components from regular HTML tags in JSX, as React treats elements starting with a lowercase letter as DOM tags and those starting with a capital letter as custom components.
    topics:
      - 'Core'
      - 'Beginner'
  - question: How to render a list in React?
    answer: render-list.md
    topics:
      - 'Core'
      - 'Beginner'
  - question: What are `use client` and `use server` directives?
    answer: The `use client` directive marks source files whose components are intended to execute only on the client. Conversely, `use server` marks server-side functions that can be invoked from client-side code.
    topics:
      - 'SSR'
      - 'Intermediate'
  - question: Can you use hooks in Server Components?
    answer: No, hooks are not supported in Server Components. Hooks are a client-side feature and are not supported in Server Components. However, you can use hooks in client components and import them into Server Components.
    topics:
      - 'SSR'
      - 'Intermediate'
  - question: How to create a Custom hook in React?
    answer: custom-hook.md
    topics:
      - 'Core'
      - 'Intermediate'
  - question: What is Hydration in React?
    answer: |
      Hydration is the process of using client-side JavaScript to add interactivity to the markup generated by the server. When you use server-side rendering, the server returns a static HTML representation of the component tree. Once this reaches the browser, in order to make it interactive, React "hydrates" the static content, turning it into a fully interactive application.
    topics:
      - 'SSR'
      - 'Intermediate'
  - question: What is Strict Mode in React and why is it useful?
    answer: strict-mode.md
    topics:
      - 'Debugging'
      - 'Intermediate'
  - question: How do you investigate a slow React app and identify performance bottlenecks?
    answer: investigate-slow-app.md
    topics:
      - 'Performance'
      - 'Intermediate'
---
