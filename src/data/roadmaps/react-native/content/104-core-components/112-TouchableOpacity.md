# React Native TouchableOpacity

`TouchableOpacity` is a React Native component that provides a wrapper for making views respond to touches with an opacity effect. It is commonly used for buttons and clickable elements.

## Importing TouchableOpacity
```javascript
import { TouchableOpacity, Text } from 'react-native';
```

## Basic Usage
```javascript
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Button Pressed!')}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
```

## Props
| Prop | Type | Description |
|------|------|-------------|
| `activeOpacity` | `number` | Defines the opacity when the button is pressed. Default is `0.2`. |
| `onPress` | `function` | Function to be executed when the button is pressed. |
| `style` | `object` | Custom styles for the button container. |
| `disabled` | `boolean` | If `true`, disables the button. |

## Example with `activeOpacity`
```javascript
<TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => Alert.alert('Opacity Example!')}>
  <Text style={styles.buttonText}>Press Me</Text>
</TouchableOpacity>
```

## Conclusion
`TouchableOpacity` is a simple and efficient way to create touchable elements in React Native. It provides visual feedback with an opacity change, making the UI more interactive and user-friendly.

