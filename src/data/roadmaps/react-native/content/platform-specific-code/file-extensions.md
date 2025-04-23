# File Extensions

In React Native, you can write platform-specific code by using specific file extensions, such as appending `.android.` or `.ios.` to your file names, allowing React Native to automatically load the appropriate file based on the platform. This approach is useful in two main scenarios: creating separate files for platform-specific components, like `Header.ios.js` and `Header.android.js`, which can have different implementations and styles for iOS and Android, and using the `Platform` module within a single file to conditionally render platform-specific code. By leveraging these techniques, developers can create tailored components and features for each platform while keeping their codebase organized and maintainable.

Visit the following resources to learn more:

- [@official@Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [@official@App Extensions](https://reactnative.dev/docs/app-extensions)
