# Text Component

The `Text` component is a basic element in React Native used to display text content on the screen. While it has some basic styling properties, you usually nest it inside other components (e.g., `View`) to create more complex UIs.

Some common properties of the `Text` component include:

- `style`: Apply a set of styling rules to the text, such as font size, color, and font family.
- `numberOfLines`: Limit the number of lines shown in the text. This can be especially useful for long paragraphs or truncating a long title.
- `onPress`: Add a function that gets called when the user taps on the text.
- `allowFontScaling`: Specify whether to allow font scaling based on user's font settings.

Here's a simple example using the `Text` component:

```javascript
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SimpleText = () => {
  return (
    <Text style={styles.text} numberOfLines={2} onPress={() => alert('Hello')}>
      This is an example of a Text component in React Native. Tap on me!
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Arial',
  },
});

export default SimpleText;
```

In this example, we create a `Text` element with some text content, apply styling, limit it to two lines, and add an `onPress` event.

Visit the following resources to learn more:

- [@article@Text - React Native](https://reactnative.dev/docs/text)
