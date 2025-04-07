# Text Input

`TextInput` is a core component in React Native that allows the user to enter text. It is commonly used to collect user data, like emails or passwords. You can customize the appearance of `TextInput` by using various props such as `placeholder`, `multiline`, `maxLength`, and more.

Here's a basic example of using `TextInput`:

```javascript
import React, { useState } from 'react';
import { TextInput, View, Button } from 'react-native';

const App = () => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    alert('You entered: ' + text);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Enter text here"
      />
      <Button
        onPress={handleSubmit}
        title="Submit"
      />
    </View>
  );
};
```

In this example, the `TextInput` component is styled with a border, and there's a placeholder text to show the user the expected input. The `onChangeText` prop is used to manage the state of the input text, and a "Submit" button is provided to process the input data.

For more advanced use cases, you can explore the [official documentation](https://reactnative.dev/docs/textinput).