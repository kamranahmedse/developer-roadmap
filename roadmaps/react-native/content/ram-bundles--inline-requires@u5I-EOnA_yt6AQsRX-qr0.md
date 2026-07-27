# RAM Bundles + Inline Requires

If you have a large app you may want to consider the Random Access Modules (RAM) bundle format, and using inline requires. This is useful for apps that have a large number of screens which may not ever be opened during a typical usage of the app. Generally it is useful to apps that have large amounts of code that are not needed for a while after startup. For instance the app includes complicated profile screens or lesser used features, but most sessions only involve visiting the main screen of the app for updates. We can optimize the loading of the bundle by using the RAM format and requiring those features and screens inline (when they are actually used).

Visit the following resources to learn more:

- [@official@RAM Bundles and Inline Requires](https://reactnative.dev/docs/ram-bundles-inline-requires)