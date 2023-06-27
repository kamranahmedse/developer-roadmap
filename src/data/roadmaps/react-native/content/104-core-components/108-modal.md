# Modal

A `Modal` is a component that displays content on top of the current view, creating an overlay that can be used for various purposes, such as displaying additional information, confirmation messages, or a selection menu.

```jsx
import React, {useState} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View>
            <Text>Hello, I am a Modal!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

export default App;
```

In this example, `Modal` is imported from `react-native` and used to create a modal overlay. The modal visibility is managed using the `useState` hook and is toggled using the `TouchableHighlight` components.

Some of the modal properties include:

- `animationType`: Controls how the modal appears and disappears. Possible values are `none`, `slide`, and `fade`. Default is `none`.
- `transparent`: Determines whether the background is transparent or not. Default is `false`.
- `visible`: Controls the visibility of the modal. Default is `true`.
- `onRequestClose`: Called when the user tries to close the modal. Required on Android to properly handle the hardware back button.

For more information and prop details, you can check out the [official documentation](https://reactnative.dev/docs/modal).