# Listings

When working with listings in React Native, the commonly used components include:

- **FlatList** - It is a high-performance, scrollable list component that renders a large number of items efficiently.
   
   Example:
   ```jsx
   import { FlatList, Text } from 'react-native';

   const data = [
     { id: 1, text: 'Item 1' },
     { id: 2, text: 'Item 2' },
     { id: 3, text: 'Item 3' },
   ];

   const renderItem = ({ item }) => <Text>{item.text}</Text>;

   const MyFlatList = () => (
     <FlatList
       data={data}
       renderItem={renderItem}
       keyExtractor={item => item.id.toString()}
     />
   );
   ```

- **SectionList** - Similar to FlatList, but it is used when you want to display data in separate sections with section headers.

   Example:
   ```jsx
   import { SectionList, Text } from 'react-native';

   const sections = [
     { title: 'Section 1', data: ['Item 1', 'Item 2', 'Item 3'] },
     { title: 'Section 2', data: ['Item 4', 'Item 5', 'Item 6'] },
   ];

   const Item = ({ text }) => <Text>{text}</Text>;
   const SectionHeader = ({ title }) => <Text>{title}</Text>;

   const MySectionList = () => (
     <SectionList
       sections={sections}
       renderItem={({ item }) => <Item text={item} />}
       renderSectionHeader={({ section: { title } }) => (
         <SectionHeader title={title} />
       )}
       keyExtractor={(item, index) => item + index}
     />
   );
   ```

- **VirtualizedList** - A lower-level component for rendering large lists and for more fine-grained control over list rendering performance.

   Example:
   ```jsx
   import { VirtualizedList, Text } from 'react-native';

   const data = [
     { id: 1, text: 'Item 1' },
     { id: 2, text: 'Item 2' },
     { id: 3, text: 'Item 3' },
   ];

   const getItemCount = data => data.length;
   const getItem = (data, index) => data[index];

   const renderItem = ({ item }) => <Text>{item.text}</Text>;

   const MyVirtualizedList = () => (
     <VirtualizedList
       data={data}
       renderItem={renderItem}
       keyExtractor={item => item.id.toString()}
       getItemCount={getItemCount}
       getItem={getItem}
     />
   );
   ```

These components are essential when dealing with dynamic data and displaying large lists in React Native applications.