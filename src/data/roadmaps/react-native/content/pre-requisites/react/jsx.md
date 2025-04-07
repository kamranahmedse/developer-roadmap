# JSX

JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript code. It was developed to be used with React and has become an integral part of working with React.

## Basic Syntax

JSX looks similar to HTML, and you can mix it with JavaScript expressions within curly braces `{}`.

Here's an example with a simple JSX element:

```jsx
const element = <h1>Hello, world!</h1>;
```

## JavaScript Expressions in JSX

You can embed JavaScript expressions within JSX by wrapping them in curly braces `{}`.

Here's an example:

```jsx
const name = 'John Doe';
const element = <h1>Hello, {name}!</h1>;
```

## Attributes in JSX

You can use JSX to define attributes for your elements, similar to how you would in HTML. However, some attribute names in JSX are slightly different from their HTML counterparts due to conflicts with reserved JavaScript keywords (for example, `className` instead of `class`).

Here's an example:

```jsx
const className = 'my-class';
const element = <h1 className={className}>Hello, world!</h1>;
```

## Children in JSX

You can nest JSX elements by enclosing them within the opening and closing tags of a parent element.

Here's an example:

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>This is an example of nested JSX elements.</p>
  </div>
);
```

## JSX Represents Objects

Under the hood, JSX represents JavaScript objects called "React elements". When you use JSX, your JavaScript code gets automatically transformed into these React elements.

Here's an example of a JSX element and its corresponding JavaScript object:

```jsx
const elementJSX = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const elementJSObject = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

Both `elementJSX` and `elementJSObject` represent the same thing and will produce the same result when rendered.

That's a brief summary of JSX. You'll find that it becomes an essential part of working with React as you continue learning about React Native.

- [@official@Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [@official@JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [@feed@Explore top posts about JSX](https://app.daily.dev/tags/jsx?ref=roadmapsh)
