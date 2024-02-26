# Touchables

In React Native, `Touchable` components are used to handle user interactions like taps, long presses, and double-taps on the appropriate elements. The main Touchable components include:

- `TouchableOpacity`: The opacity of the wrapped view is decreased when it's active.
   
   ```jsx
   import { TouchableOpacity } from 'react-native';

   <TouchableOpacity
     onPress={() => {
       alert('Tapped!');
     }}
   >
     <Text>Tap me</Text>
   </TouchableOpacity>
   ```

- `TouchableHighlight`: The view is highlighted with a specified color when active.

   ```jsx
   import { TouchableHighlight } from 'react-native';

   <TouchableHighlight
     onPress={() => {
       alert('Tapped!');
     }}
     underlayColor="gray"
   >
     <Text>Tap me</Text>
   </TouchableHighlight>
   ```

- `TouchableWithoutFeedback`: No visual feedback is provided when the view is tapped.

   ```jsx
   import { TouchableWithoutFeedback } from 'react-native';

   <TouchableWithoutFeedback
     onPress={() => {
       alert('Tapped!');
     }}
   >
     <Text>Tap me</Text>
   </TouchableWithoutFeedback>
   ```

- `TouchableNativeFeedback`: Provides additional Android-specific visual feedback.

   ```jsx
   import { TouchableNativeFeedback } from 'react-native';

   <TouchableNativeFeedback
     onPress={() => {
       alert('Tapped!');
     }}
   >
     <Text>Tap me</Text>
   </TouchableNativeFeedback>
   ```

- `TouchableScale`: The view will slightly change scale when pressed.

   ```jsx
   import { TouchableScale } from 'react-native-touchable-scale';

   <TouchableScale
     onPress={() => {
       alert('Tapped!');
     }}
     activeScale={0.9}
   >
     <Text>Tap me</Text>
   </TouchableScale>
   ```

Each of these components is from the `react-native` package, except `TouchableScale` which is from `react-native-touchable-scale`. They can be used interchangeably depending on the type of interaction you want to provide. The main `props` used with these components are `onPress`, `onLongPress`, and some component-specific ones like `underlayColor` for `TouchableHighlight`.
