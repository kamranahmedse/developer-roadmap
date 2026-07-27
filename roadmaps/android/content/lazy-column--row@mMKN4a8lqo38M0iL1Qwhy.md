# Lazy Column and Row

LazyColumn and LazyRow are composable functions in Jetpack Compose that efficiently display a large number of items in a scrollable list. Instead of composing all items at once, they only compose and render the items that are currently visible on the screen. This approach significantly improves performance and reduces memory consumption, especially when dealing with extensive datasets or dynamically changing content. They are similar to RecyclerView in the traditional Android View system, but with Compose's declarative and concise syntax.

Visit the following resources to learn more:

- [@official@Lazy Column](https://developer.android.com/reference/kotlin/androidx/compose/foundation/lazy/LazyColumn.composable)
- [@official@Lazy Row](https://developer.android.com/reference/kotlin/androidx/compose/foundation/lazy/LazyRow.composable)
- [@official@Lists and grids](https://developer.android.com/develop/ui/compose/lists)
- [@video@Lazy layouts in Compose](https://www.youtube.com/watch?v=1ANt65eoNhQ)