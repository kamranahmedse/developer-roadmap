# Metro Bundler

Metro is a JavaScript bundler which takes in options, an entry file, and gives you a JavaScript file including all JavaScript files back. Every time you run a react native project, a compilation of many javascript files are done into a single file. This compilation is done by a bundler which is called Metro. Metro is launched along with the node server that is being run by doing ‘npm start’ and we can see BUNDLE written in green box in the image above which shows the Bundling of files everytime we run a new project or reloads a current one.

## How Metro helps React Native?

### Metro packager performs a few jobs:

Most important feature of Metro is to provide the Sub-second reload cycles as they add and debug app UIs very quickly in matter of seconds thus you dont have to wait for the whole app to restart and start working. Similar feature is integrated in the Flutter library which is also a cross platform tool for building mobile apps.
Another feature is to provide fast startup to the app on the device/emulator by providing quick bundling speed.
Metro combines all javascript code into a single file and translates any Javascript code that device wont understand ( like JSX or some newer javascript syntax )
Metro convert assets ( eg PNG files ) into objects that can be displayed by an ‘ Image ‘ component.
Thus we can say that some of the most important and cool features that provides react native developers a good developing experience are because of Metro Bundler.

## How Metro works or does bundling process?

### Metro has three separate stages in its bundling process:

> Resolution
> Transformation
> Serialization

### Bundling Process
### Resolution
Metro needs to build a directed graph of all the modules that are required from the entry point to start the building process. To find which file is required from another file Metro uses a resolver. For eg to understand better if we have an app with multiple screens then Navigation libraries make a directed map of screens according to their order, in similar way Resolution maps javascript files in an order.

### Transformation
All modules go through a transformer. A transformer is responsible for converting a module to a format that is understandable by the target platform (eg. React Native). Transformation of modules happens in parallel based on the amount of cores that you have.

### Serialization
After going through transformation process and converting modules into accessible format they will be serialized. A serializer combines the modules to generate one or multiple bundles. A bundle is literally a bundle of modules combined into a single JavaScript file.

Visit the [Metro Bundler](https://facebook.github.io/metro/) website for more information.
