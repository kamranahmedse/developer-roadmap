# Styling

Styling in React Native is accomplished through JavaScript and uses a subset of CSS properties. Unlike CSS in web development, React Native has its own set of components and styling rules. The main components used for styling are `StyleSheet`, `View`, and `Text`. 

## StyleSheet

`StyleSheet` is a module provided by React Native to manage and optimize styles. It is similar to a CSS stylesheet and helps in creating and working with multiple styles efficiently.

```jsx
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

## View and Text components

`View` and `Text` components are the basic building blocks for creating a user interface in React Native. They are used to add structure and style to the layout.

```jsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

## Inline styles

In some cases, you might prefer to apply styles directly to a component using inline styling. However, it is not recommended for larger applications due to performance issues.

```jsx
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Hello, React Native!
      </Text>
    </View>
  );
}
```

In summary, styling in React Native is done through JavaScript using a subset of CSS properties. The main components used for styling are `StyleSheet`, `View`, and `Text`. You can also use inline styles when necessary, although it's not recommended for performance reasons.