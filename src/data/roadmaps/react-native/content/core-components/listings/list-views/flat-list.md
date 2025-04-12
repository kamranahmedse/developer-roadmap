# FlatList

`FlatList` is a `React Native` core component that displays a scrolling list of changing, but similarly structured, data. It is an efficient list component that makes use of a limited scrolling `renderWindow`, reducing the memory footprint and creating smooth scrolling. Additionally, `FlatList` supports-Headers, Footers, Pull-to-refresh, and Horizontal scrolling, among other things.

Here is a basic example demonstrating how to use the `FlatList` component:

```javascript
import React from 'react';
import { FlatList, View, Text } from 'react-native';

const data = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
  // ...
];

const renderItem = ({ item }) => (
  <View>
    <Text>{item.content}</Text>
  </View>
);

const MyFlatList = () => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />
);

export default MyFlatList;
```

In the example above:

- We import the `FlatList` along with `View` and `Text` components.
- We have an array of data containing objects with a unique ID and content.
- `renderItem` is a function that takes an item and returns the components to render for that item.
- In the `MyFlatList` component, we use the `FlatList` and pass the data, the `renderItem` function, and a `keyExtractor` to extract a key from the item.