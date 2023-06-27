# Image

The `Image` component is used to display images in a React Native application. It allows you to load and display local as well as remote images, providing essential props and methods for better image handling and customization.

To use the `Image` component, you need to import it from 'react-native':

```javascript
import { Image } from 'react-native';
```

To display a local image in the application, you have to require it in the `source` prop of the `Image` component. Place the image file in your project directory and use the following syntax:

```javascript
<Image source={require('./path/to/your/image.png')} />
```

To display a remote image from a URL, you need to set the `source` prop with a `uri` object:

```javascript
<Image source={{ uri: 'https://path/to/your/remote/image.png' }} />
```

Keep in mind that you need to define the dimensions (width and height) when using remote images:

```javascript
<Image source={{ uri: 'https://path/to/remote/image.png' }} style={{ width: 200, height: 200 }} />
```

You can set image scaling and positioning with the `resizeMode` prop. It accepts the following values: `cover`, `contain`, `stretch`, `repeat`, and `center`. Default value is `cover`.

```javascript
<Image source={require('./path/to/your/image.png')} resizeMode="contain" />
```

There are additional props which you can use to further modify the image behavior.

- `blurRadius`: Adds a blur effect to the image.
- `defaultSource`: Displays a placeholder image while the target image is loading (only for Android).
- `loadingIndicatorSource`: Similar to `defaultSource`, but works on both Android and iOS.
- `onLoad`: A callback function that gets called when the image finishes loading.

Here's an example combining some of these props:

```javascript
<Image style={{ width: 300, height: 200 }}
       source={{ uri: 'https://path/to/remote/image.png' }}
       resizeMode="contain"
       onLoad={() => console.log('Image loaded')}>
```

For more information and details, you can refer to the React Native docs: [Image - React Native](https://reactnative.dev/docs/image)