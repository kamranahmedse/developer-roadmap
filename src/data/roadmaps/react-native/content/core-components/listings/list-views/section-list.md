# SectionList

`SectionList` is a component used to render sections and headers in a scroll view. It helps to manage and optimize a large list of items divided into categories. It is one of the List View components provided by React Native along with FlatList.

The key difference between SectionList and FlatList is that SectionList separates data items into sections, with headers.

Here's an example of how to use a SectionList in your app:

```javascript
import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={[
            {
              title: 'Section 1',
              data: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
            },
            {
              title: 'Section 2',
              data: ['Item 2.1', 'Item 2.2', 'Item 2.3'],
            },
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'lightgrey',
    padding: 5,
  },
  item: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
```

In this example, we have two sections: 'Section 1' and 'Section 2'. Each section has its own data items.

`renderItem` is a function that takes an object containing an item property and returns a Text component with the item value.

`renderSectionHeader` is a function that takes an object containing a section property and returns a text component with the section's title.