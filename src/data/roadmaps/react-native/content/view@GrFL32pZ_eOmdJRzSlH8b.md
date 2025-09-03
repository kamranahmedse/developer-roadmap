# View

The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. View maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a UIView, ```<div>```, android.view, etc.

View is designed to be nested inside other views and can have 0 to many children of any type.

This example creates a View that wraps two boxes with color and a text component in a row with padding.
<img width="1600" height="1202" alt="image" src="https://github.com/user-attachments/assets/063c3938-f0c7-4d85-9c14-161cb8ca2616" />


Views are designed to be used with StyleSheet for clarity and performance, although inline styles are also supported.


- https://reactnative.dev/docs/view
