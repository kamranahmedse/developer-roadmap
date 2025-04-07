# Platform Specific Code

In React Native, you might need to maintain certain parts of your application differently for iOS and Android. This is where "Platform Specific Code" comes into play. There are two ways you can achieve this:

## Platform module

React Native provides a `Platform` module that can be used to detect which platform your code is running on (iOS or Android). This can be helpful when you have minor platform differences in your code execution, component styles, or API calls.

**Example:**

```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },
});
```

## File extensions

Another way to handle platform-specific logic is by using file extensions like `.ios.js` and `.android.js`. By naming your files with these extensions, React Native will automatically pick up the appropriate file based on the platform the app is running on.

**Example:**

Let's say you have two files in your project, `Header.ios.js` and `Header.android.js`. When you import the `Header` component in your code, React Native will automatically import the correct file for the platform.

```javascript
// App.js
import Header from './Header';
```