# Button

A `Button` is a built-in React Native component used to create clickable buttons. It is a simple, customizable and easy-to-use component that captures touches and triggers an `onPress` event when pressed.

Here's a simple example of how to create a Button in React Native:

```javascript
import React from 'react';
import { Button } from 'react-native';

const MyButton = () => {
  const onPressHandler = () => {
    alert('Button Pressed');
  };

  return (
    <Button
      title="Click me"
      color="#841584"
      onPress={onPressHandler}
    />
  );
};

export default MyButton;
```

In this example, we import the Button component from 'react-native', create a functional component `MyButton`, and define an `onPressHandler` function that will be called when the button is pressed. We then use the `Button` component and pass in the following props:

- `title`: The text to display on the button.
- `color`: The background color of the button.
- `onPress`: The function to call when the button is pressed.

When the button is pressed, the `onPressHandler` function will be called, and an alert will pop up saying "Button Pressed".