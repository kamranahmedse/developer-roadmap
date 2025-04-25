# Platform Specific Code

In React Native, managing platform-specific code for iOS and Android is essential for addressing differences in application behavior and appearance. This can be achieved in two primary ways: using the `Platform` module, which allows developers to detect the current platform and apply conditional styles or logic accordingly, as demonstrated by using `Platform.select` to set different background colors for iOS and Android; and utilizing file extensions like `.ios.js` and `.android.js`, which enables React Native to automatically load the appropriate file based on the platform. For instance, if you have `Header.ios.js` and `Header.android.js`, importing the `Header` component will automatically reference the correct file for the running platform, streamlining the development process.

Visit the following resources to learn more:

- [@official@Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [@official@App Extensions](https://reactnative.dev/docs/app-extensions)
