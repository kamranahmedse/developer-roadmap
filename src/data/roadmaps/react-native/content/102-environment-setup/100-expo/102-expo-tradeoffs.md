# Expo Tradeoffs

Expo is a powerful tool that simplifies the React Native development process, but it has some limitations. Here's a summary of the tradeoffs you may face when using Expo.

## Limited native modules

Expo offers a set of pre-built native modules, which are really helpful but might not cover all the functionalities required for your specific app. If you need a custom native module or a third-party library that is not supported by Expo, you'll have to eject from the Expo managed workflow and switch to the bare-workflow or create a custom native module (native code) yourself.

## Performance

Expo adds an extra layer to your React Native app, which can cause performance issues, especially for large or complex apps. The bare-workflow may provide better performance as you have more control over the native libraries and app optimization.

## App size

Expo apps tend to have a larger app size because they include the entire Expo SDK, regardless of which modules you use in your app. In contrast, non-Expo apps can optimize their size by including only the required native modules.

## Updates and upgrades

When you rely on Expo, you depend on their release cycle for updates and upgrades. If React Native adds a new feature or fixes a bug, you have to wait for an updated Expo version to implement it. This may cause delays or limitations in your app development process.

## Ejecting complications

If you start a project with Expo and later decide to eject and use regular React Native, you might face challenges migrating your code and adjusting to the new configuration. You may need to rewrite some parts of your code or manually migrate dependencies.

## Limited customizability

Expo abstracts various aspects of customization and configuration, which can be a double-edged sword. If you need additional customizations that are not supported by Expo, you'll have to eject or switch to a bare-workflow project, which gives you more control over the native code.

In summary, while Expo offers great tooling and simplifies the development process, it has certain limitations that you should consider before choosing it for your app development.