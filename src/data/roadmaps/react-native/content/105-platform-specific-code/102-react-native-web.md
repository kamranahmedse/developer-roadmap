# React Native Web

React Native Web is an extension of React Native which allows you to run your React Native apps not only on iOS and Android devices, but also on the web. It uses the same components and APIs you're familiar with in React Native, but renders them into the DOM of a webpage instead of native UI elements.

The main goal of React Native Web is to provide a consistent developer experience across platforms, reducing the effort needed to build and maintain multi-platform apps.

## Platform-specific Code

While React Native Web is designed to provide a consistent experience across platforms, there may still be cases where you want to use platform-specific code for an improved native experience.

For example, let's say you have a React Native app with the following styles:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'blue',
  },
});
```

Now, let's say you want to apply some platform-specific styling. You can create separate stylesheets for each platform, like `styles.native.js` and `styles.web.js`. The contents of `styles.native.js` would look like this:

```javascript
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // Your platform-specific styles
  },
  text: {
    // Your platform-specific styles
  },
});
```

And the contents of `styles.web.js` would look like this:

```javascript
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // Your platform-specific styles
  },
  text: {
    // Your platform-specific styles
  },
});
```

Then, in your main component file, you can import the appropriate styles for each platform automatically:

```javascript
import styles from './styles';

// Now, your styles are platform-specific!
```

This way, you can cater your styles to the specific platform your app is running on, without having to clutter your main component code with conditional styling.

React Native Web also provides a utility called `Platform` that you can use to determine the current platform and apply platform-specific code directly:

```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        // Web-specific styles
      },
      native: {
        // Native-specific styles
      },
    }),
  },
  text: {
    ...Platform.select({
      web: {
        // Web-specific styles
      },
      native: {
        // Native-specific styles
      },
    }),
  },
});
```

With these techniques, you'll be able to create tailored experiences across different platforms while maintaining a consistent development experience.