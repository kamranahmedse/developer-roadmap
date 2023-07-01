# Scrolling and Swiping

In React Native, scrolling and swiping interactions can be defined and customized with a set of built-in components. These components are efficient and provide fluid navigation through the elements inside them.

## Scrolling

React Native provides `ScrollView` and `FlatList` components to handle scrolling interactions. Both components have their own use cases. Let's discuss them in detail:

- **ScrollView**: Used for simple and short lists with a known number of elements. It renders all the child elements in memory at once, which can negatively impact performance for longer lists.

Example:
```javascript
import React from 'react';
import { ScrollView, Text } from 'react-native';

const ScrollViewExample = () => (
  <ScrollView>
    {['Element 1', 'Element 2', 'Element 3'].map((item, index) => (
      <Text key={index}>{item}</Text>
    ))}
  </ScrollView>
);
```

- **FlatList**: Used for long and complex lists where the number of elements is unknown or potentially infinite. It optimizes performance by rendering only the currently visible elements in the viewport.

Example:
```javascript
import React from 'react';
import { FlatList, Text } from 'react-native';

const DATA = [
  { id: '1', text: 'Element 1' },
  { id: '2', text: 'Element 2' },
  { id: '3', text: 'Element 3' },
];

const renderItem = ({ item }) => (
  <Text>{item.text}</Text>
);

const FlatListExample = () => (
  <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
  />
);
```

## Swiping

To implement swiping in React Native, the community-driven package `react-native-gesture-handler` is commonly used. One of its components is `Swipeable`, which allows you to create swipeable elements with custom swipe actions.

Example:

```javascript
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const RightActions = (progress, dragX, onPress) => {
  return (
    <RectButton onPress={onPress}>
      <View>
        <Text>Delete</Text>
      </View>
    </RectButton>
  );
};

const SwipeableExample = () => {
  const handleDelete = () => {
    alert('Delete action');
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        RightActions(progress, dragX, handleDelete)
      }
    >
      <View>
        <Text>Swipeable Element</Text>
      </View>
    </Swipeable>
  );
};
```

In summary, React Native provides various components for smooth scrolling and swiping interactions. Components like `ScrollView`, `FlatList`, and `react-native-gesture-handler` are essential tools in creating a seamless user experience.