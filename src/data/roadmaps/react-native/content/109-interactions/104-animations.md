# Animations

React Native supports two types of animations: `Animated` and `LayoutAnimation`. The `Animated` API provides a basic set of methods for creating and managing animations, while the `LayoutAnimation` API provides a way to animate changes from one layout to another.

## Animated

`Animated` is a declarative API that focuses on handling animation-related calculations. It allows you to create and combine animations with fine-grained control over the specific properties that are being animated. You can use this API to create a variety of effects, such as fading, scaling, and translating components on the screen.

Here's a simple example of how to use `Animated` to move a view across the screen:

```javascript
import React, { Component } from "react";
import { Animated, View } from "react-native";

class MoveView extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
  }
  
  componentDidMount() {
    Animated.timing(this.position, {
      toValue: { x: 100, y: 100 },
      duration: 1000,
    }).start();
  }

  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        {/* Your content here */}
      </Animated.View>
    );
  }
}
```

It creates a new `Animated` value that represents the position of the view and moves it to another location over a duration of 1000 milliseconds.

## LayoutAnimation

`LayoutAnimation` is a higher-level abstraction for animating changes to the layout. Instead of animating individual properties, you define how the changes should occur and React Native takes care of updating the layout accordingly. This is particularly useful for animating multiple components or modifying the layout in response to user interaction, such as adding/removing/reordering items in a list.

Here's an example of how to use `LayoutAnimation` to animate a view when it is added to or removed from a list of items:

```javascript
import React, { Component } from "react";
import { LayoutAnimation, TouchableOpacity, View } from "react-native";

class ListItem extends Component {
  componentDidMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  componentWillUnmount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this.props.onRemove}>
          {/* Button content here */}
        </TouchableOpacity>
        {/* Item content here */}
      </View>
    );
  }
}
```

In this example, whenever a `ListItem` component is added or removed, the layout will be animated using the preset `easeInEaseOut` configuration.

These two animation methods in React Native help you create smooth, natural-looking animations for a variety of interactions and use cases in your applications.