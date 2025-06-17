# Optimizing FlatList Config

In React Native, the FlatList component is essential for efficiently displaying large lists of items, and optimizing its configuration is crucial for enhancing performance. Here are key tips for optimizing FlatList:

1. **Set `windowSize`**: Adjust the `windowSize` prop, which determines the number of pages rendered above and below the current view. Reducing this value from the default of 21 can decrease off-screen component rendering.

2. **Enable `removeClippedSubviews`**: This prop unmounts components that are off-screen, helping to free up resources.

3. **Adjust `maxToRenderPerBatch`**: Control the number of items rendered per batch with this prop, which defaults to 10. Tailor this value to fit your list's needs.

4. **Set `initialNumToRender`**: This prop defines how many items to render initially, helping to prevent blank screens during loading.

5. **Use `getItemLayout`**: By specifying the exact dimensions of each item with this prop, you can avoid dynamic measurements, leading to better performance.

Visit the following resources to learn more:

- [@official@Optimizing Flatlist Configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)