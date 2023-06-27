# List Views in React Native

List views are an essential component in mobile applications when you need to display a list of items in an organized and efficient way. In React Native, there are two primary components to display a list - `FlatList` and `SectionList`. Let's dive into each one with some examples.

## FlatList

A `FlatList` is a simple list view component that renders a list of items in a user-friendly scrolling format. FlatList is great for large lists of data that only render a small number of items on the screen at a time. It supports both horizontal and vertical scrolling, allows you to customize the appearance of items, and provides built-in performance optimizations.

Here's a basic example using FlatList:

```jsx
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
);

const App = () => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
});

export default App;
```

## SectionList

A `SectionList` is a more complex list view component that presents items in multiple sections with optional section headers. It is suitable for use cases where you need to categorize data into separate sections and display a header for each section.

Here's a basic example using SectionList:

```jsx
import React from 'react';
import { View, SectionList, Text, StyleSheet } from 'react-native';

const data = [
  {
    title: 'Section 1',
    data: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
  },
  {
    title: 'Section 2',
    data: ['Item 2.1', 'Item 2.2', 'Item 2.3'],
  },
];

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item}</Text>
  </View>
);

const renderSectionHeader = ({ section: { title } }) => (
  <View style={styles.header}>
    <Text>{title}</Text>
  </View>
);

const App = () => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item + index}
    renderItem={renderItem}
    renderSectionHeader={renderSectionHeader}
  />
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    backgroundColor: 'skyblue',
    padding: 20,
  },
});

export default App;
```

In summary, `FlatList` and `SectionList` are the primary list view components in React Native. Use `FlatList` for simple lists and when performance is a priority, and use `SectionList` when you need to organize data into multiple sections.