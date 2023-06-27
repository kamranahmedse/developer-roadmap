# Deep Linking

Deep linking is a technique used in mobile applications that allows you to open a specific screen, content, or functionality within the application using a URL or a custom URL scheme. This is useful for providing seamless user experiences by navigating the user directly to the desired part of the app. Deep linking can be triggered by clicking on a link in an email, scanning a QR code, or through a push notification.

There are two types of deep links:

1. **Universal Links** (iOS) / **App Links** (Android): These are HTTPS URLs that allow the user to navigate to a specific screen when the app is installed and fallback to a specified website when the app is not installed.
2. **Custom URL Schemes**: Unique URLs, like `myapp://my-screen`, that can open the app directly to a specific screen when clicked.

## Handling Deep Links in React Native

In React Native, you can handle deep links using the `Linking` module which provides the necessary methods to work with deep links.

First, you have to import `Linking` from `"react-native"`:

```js
import { Linking } from 'react-native';
```

To handle deep links, you need to add a listener that will be triggered when the app receives a deep link. You can add the listener in the `componentDidMount` lifecycle method and remove it in the `componentWillUnmount` method.

For example:

```js
import React from 'react';
import { Linking, Text, View } from 'react-native';

class App extends React.Component {
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    // Handle your deep link logic
    console.log('Received deep link: ', event.url);
  }

  render() {
    return (
      <View>
        <Text>Hello from React Native!</Text>
      </View>
    );
  }
}

export default App;
```

To work with universal links or app links, you need to configure your app on both iOS and Android. You can follow the official guide [here](https://reactnative.dev/docs/linking).

You can also use popular libraries like `react-navigation` or `react-native-navigation` that provide built-in support for handling deep links in your app.