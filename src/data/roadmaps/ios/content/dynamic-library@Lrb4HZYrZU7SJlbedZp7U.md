# Dynamic Library

Dynamic libraries in iOS development are code modules that are loaded into an app's memory at runtime rather than being compiled into the app's executable. They are typically distributed as .dylib files or packaged within frameworks. Unlike static libraries, dynamic libraries remain separate from the app's main binary, allowing for more efficient memory usage and smaller app sizes. Multiple apps can share a single copy of a dynamic library in memory, reducing overall system resource consumption. This approach facilitates easier updates to the library without requiring a full app recompilation. In iOS, dynamic libraries are primarily used within frameworks, as Apple restricts the use of standalone dynamic libraries in App Store submissions. Dynamic frameworks offer benefits like code modularity, easier sharing of code between apps, and potential performance improvements through reduced launch times. However, they introduce a slight runtime overhead for library loading. The use of dynamic libraries in iOS is subject to Apple's guidelines and is generally recommended for larger, frequently updated codebases or when sharing code across multiple apps.

Learn more from the following resources:

- [@official@Overview of Dynamic Libraries](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/OverviewOfDynamicLibraries.html)
- [@article@Static Library vs Dynamic Library in iOS](https://pratheeshbennet.medium.com/static-library-vs-dynamic-library-in-ios-55478ed53a03)
