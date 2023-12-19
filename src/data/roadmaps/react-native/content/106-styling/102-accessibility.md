# Accessibility

Accessibility (a11y) in React Native allows you to create applications that are usable to everyone, including people with disabilities. It provides a set of attributes and APIs to customize UI components by considering diverse user needs.

## Accessibility Props

React Native provides several accessibility properties that can be applied to components for enhancing their a11y features:

`accessible` : (Boolean) - Indicates if the element can be focused by screen readers.
```jsx
<TouchableOpacity accessible={true} />
```

`accessibilityLabel` : (String) - Used by the screen reader to describe the element to the user.
```jsx
<TouchableOpacity accessibilityLabel="Tap me!">
```

`accessibilityHint` : (String) - Gives a hint to the user of the components behavior.
```jsx
<TouchableOpacity accessibilityHint="Tapping this button will show a welcome text">
```

`accessibilityRole` : (String) - Describes the role of the element for the screen reader.
```jsx
<TextInput accessibilityRole="search" />
```

`accessibilityValue` : (Object with properties: min, max, now) - Defines the accessibility values for elements such as progress bars or sliders, among others.

```jsx
<Slider
  accessibilityValue={{
    min: 0,
    max: 100,
    now: 50,
  }}
/>
```

`accessibilityState` : (Object) - Represents the current state of the component.
```jsx
<TouchableOpacity
  accessibilityState={{
    disabled: false,
    selected: true,
  }}
/>
```

`accessibilityActions` and `onAccessibilityAction` are used to create custom actions.
```jsx
import { AccessibilityInfo, Text, View } from 'react-native';

function CustomButton() {
  const [count, setCount] = React.useState(0);

  const onIncrement = () => {
    setCount(count + 1);
  };

  React.useEffect(() => {
    const announce = () => {
      AccessibilityInfo.announceForAccessibility(`Count raised to ${count}`);
    };
    announce();
  }, [count]);

  return (
    <View
      accessible={true}
      accessibilityActions={[
        { name: "increment", label: "increase count" },
      ]}
      onAccessibilityAction={(event) => {
        switch (event.nativeEvent.actionName) {
          case "increment":
            onIncrement();
            break;
        }
      }}
    >
      <Text>Increment Counter: {count}</Text>
    </View>
  );
}
```

Of course, different platforms may have some exclusive accessibility properties, which can be found in the [official React Native documentation](https://reactnative.dev/docs/accessibility).