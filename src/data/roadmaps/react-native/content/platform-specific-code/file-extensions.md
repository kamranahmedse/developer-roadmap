# File Extensions

In React Native, you can write platform-specific code by using specific file extensions. By appending `.android.` or `.ios.` to your file's name, React Native will load the file corresponding to the platform you are running your app on.

There are two main scenarios where you can use this approach:

## Platform-Specific Component Files

You can create separate files for each platform's specific components, keeping the implementation and styling different for Android and iOS.

For example, if you have a `Header` component, you can create two separate files `Header.ios.js` and `Header.android.js`. React Native will automatically pick the right file depending on the platform it's running on.

```javascript
// Header.ios.js
import React from 'react';
import { View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={{ backgroundColor: 'blue' }}>
      <Text>iOS Header</Text>
    </View>
  );
};

export default Header;
```

```javascript
// Header.android.js
import React from 'react';
import { View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={{ backgroundColor: 'green' }}>
      <Text>Android Header</Text>
    </View>
  );
};

export default Header;
```

## Platform-Specific Code within a File

You can also use the `Platform` module from React Native to determine which platform-specific code to run within a single file.

```javascript
import { Platform, StyleSheet, Text } from 'react-native';

const ComponentWithPlatformSpecificCode = () => {
  return <Text style={styles.content}>Hello World!</Text>;
};

const styles = StyleSheet.create({
  content: {
    color: Platform.select({
      ios: 'blue',
      android: 'green',
    }),
  },
});

export default ComponentWithPlatformSpecificCode;
```

Using file extensions and the `Platform` module, you can create tailor-made components and features for different platforms while maintaining a clean and organized codebase.