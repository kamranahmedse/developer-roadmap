# Using Native Modules

Sometimes a React Native app needs to access a native platform API that is not available by default in JavaScript, for example the native APIs to access Apple or Google Pay. Maybe you want to reuse some existing Objective-C, Swift, Java or C++ libraries without having to reimplement it in JavaScript, or write some high performance, multi-threaded code for things like image processing.

The NativeModule system exposes instances of Java/Objective-C/C++ (native) classes to JavaScript (JS) as JS objects, thereby allowing you to execute arbitrary native code from within JS. While we don't expect this feature to be part of the usual development process, it is essential that it exists. If React Native doesn't export a native API that your JS app needs you should be able to export it yourself!

- [@article@Native Modules Introduction](https://reactnative.dev/docs/native-platform)
