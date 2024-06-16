# ImageBackground

`ImageBackground` is a React Native core component that allows you to display an image as a background while still being able to place content inside the component. This helps in creating beautiful layouts with images and text or other content on top.

To use `ImageBackground`, you need to import it from the `react-native` package and then include it in your JSX.

```javascript
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const App = () => (
  <ImageBackground
    source={{ uri: 'https://some-image-url.com/background.jpg' }}
    style={styles.background}
    resizeMode="cover"
  >
    <Text style={styles.text}>Hello, World!</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
```

In the above example, `source` prop is used to add the image URL, `style` prop for adding some custom styling, and `resizeMode` to define how the image should stretch to fill the available space. The `Text` component inside the `ImageBackground` is then rendered on top of the image.

For more information and details, you can refer to the React Native docs:

- [@article@Image Background - React Native](https://reactnative.dev/docs/imagebackground)
