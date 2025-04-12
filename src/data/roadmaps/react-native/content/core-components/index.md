# Core Components

Core components are the essential building blocks provided by React Native to create a user interface for mobile applications. They are platform-agnostic, meaning they work across both iOS and Android devices. Some of the common core components include:

- `View` is a fundamental component for constructing the user interface. It is equivalent to a `div` in HTML and can be used as a container for other components.

```javascript
<View style={styles.container}>
  <Text>Hello World!</Text>
</View>
```

- `Text` is used to display text content in your app. It is similar to the `p` or `span` elements in HTML.

```javascript
<Text style={styles.title}>Welcome to my App</Text>
```

- `Image` is used to display images in your application. It can load images from local sources or remote URLs.

```javascript
<Image source={require('./assets/logo.png')} />

<Image source={{ uri: 'https://example.com/image.png' }} />
```

- `TextInput` is a basic input field that allows users to type text into your app. It is similar to the `input` element in HTML.

```javascript
<TextInput
  value={this.state.text}
  onChangeText={text => this.setState({ text })}
  style={styles.input}
/>
```

- `TouchableOpacity` is a wrapper for making elements like `View` and `Text` respond properly to touch events. It provides feedback by reducing the opacity of the wrapped component when pressed.

```javascript
<TouchableOpacity onPress={this.onButtonPress}>
  <Text style={styles.buttonText}>Press me!</Text>
</TouchableOpacity>
```

- `ScrollView` is a scrollable container that allows users to scroll through its content. It is useful when you have content that exceeds the available screen size.

```javascript
<ScrollView style={styles.scrollContainer}>
  <Text>Content 1</Text>
  <Text>Content 2</Text>
  {/* ... */}
</ScrollView>
```

- `FlatList` is used to render a list of items using a performant approach. It only renders items that are currently visible on the screen and removes others to save memory.

```javascript
<FlatList
  data={this.state.data}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
/>
```

These core components are foundational to creating functional and attractive interfaces for your React Native applications.