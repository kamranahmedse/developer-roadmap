# Pressable

Pressable is a core component in React Native that makes any view respond properly to touch or press events. It provides a wide range of event handlers for managing user interactions, such as onPress, onPressIn, onPressOut, and onLongPress. With Pressable, you can create custom buttons, cards, or any touchable elements within your app.

To use Pressable in your React Native application, you need to import it from 'react-native':

```javascript
import { Pressable } from 'react-native';
```

Wrap any view or component you want to make pressable with the Pressable component:

```javascript
<Pressable onPress={() => console.log('Pressed!')}>
  <Text>Press me</Text>
</Pressable>
```

Pressable allows you to customize its appearance and behavior according to the user interaction state. You can use the `style` prop and pass a function that sets the style based on the state.

Here's an example of a custom button that changes its background color when pressed:

```javascript
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton() {
  return (
    <Pressable
      onPress={() => console.log('Pressed!')}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressedButton : styles.normalButton,
      ]}
    >
      <Text style={styles.buttonText}>Press me</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  normalButton: {
    backgroundColor: 'blue',
  },
  pressedButton: {
    backgroundColor: 'darkblue',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
```

In this example, when the Pressable is pressed, it will change its background color from "blue" to "darkblue".