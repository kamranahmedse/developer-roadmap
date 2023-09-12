---
order: 1
briefTitle: 'React'
briefDescription: 'Test, rate and improve your React knowledge with these questions.'
title: 'React Questions'
description: 'Test, rate and improve your React knowledge with these questions.'
isNew: true
seo:
  title: 'React Questions'
  description: 'Curated list of React questions to test, rate and improve your knowledge. Questions are based on real world experience and knowledge.'
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
      - 'Basics'
      - 'Beginner'
  - question: What are the features of React?
    answer: Use of Virtual DOM instead of Real DOM, JSX, Server-side rendering, Unidirectional data flow or data binding, Reusable components, etc.
    topics:
      - 'Basics'
      - 'Beginner'
  - question: What is JSX?
    answer: JSX is a syntax extension to JavaScript and comes with the full power of JavaScript. JSX produces React “elements”. You can embed any JavaScript expression in JSX by wrapping it in curly braces. After compilation, JSX expressions become regular JavaScript objects.
    topics:
      - 'Basics'
      - 'Beginner'
  - question: What is the difference between Real DOM and Virtual DOM?
    answer: |
      Virtual DOM is the representation of a UI in the form of a plain javascript object. It is a node tree that lists the elements, their attributes and content as Objects and their properties. Real DOM is the real representation of a UI which can be seen and inspected in the browser.
      Manipulating the virtual DOM is much faster than real DOM, because nothing gets drawn on the screen. React uses this virtual DOM to figure out the most efficient way to update the browser DOM.
    topics:
      - 'Basics'
      - 'Beginner'
  - question: What is the difference between state and props?
    answer: |
      Props are used to pass data from parent to child. They are like function arguments. They are immutable.
      State is managed within the component and is mutable.
    topics:
      - 'Basics'
      - 'Beginner'
  - question: What is the difference between controlled and uncontrolled components?
    answer: controlled-vs-uncontrolled.md
    topics:
      - 'Basics'
      - 'Beginner'
  - question: What are different options to style a React component?
    answer: CSS Stylesheets, Inline styles, CSS Modules, Styled Components, CSS in JS libraries, etc.
    topics:
      - 'Styling'
      - 'Beginner'
  - question: What are different ways to keep React performant?
    answer: 'react-performance.md'
    topics:
      - 'Performance'
      - 'Intermediate'
---
