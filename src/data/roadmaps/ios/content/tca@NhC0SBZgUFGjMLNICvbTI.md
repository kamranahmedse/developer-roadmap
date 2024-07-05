# TCA

The Composable Architecture (TCA) is a library and architectural pattern for building iOS applications, developed by Point-Free. It emphasizes:

**State management**: All app state is centralized and clearly defined.

**Composability**: Complex features are built from smaller, reusable components.

**Side effect management**: Effects like network calls are handled predictably and testably.

**Testing**: The architecture facilitates comprehensive unit and integration testing.

TCA uses a unidirectional data flow, where state changes trigger actions, which may produce effects and lead to new states. It relies on Swift's value types and function composition to create a predictable and maintainable app structure.

Learn more from the following resources:

- [@opensource@The Composable architecture](https://github.com/pointfreeco/swift-composable-architecture)
- [@article@The Composable Architecture: Swift guide to TCA](https://medium.com/@dmitrylupich/the-composable-architecture-swift-guide-to-tca-c3bf9b2e86ef)
- [@video@Shai Mishali - A Newbie's Guide to The Composable Architecture](https://www.youtube.com/watch?v=XWZmgbylTpc)
