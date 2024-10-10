# DataStore

`DataStore` is a new and improved data storage solution by Android, meant to supersede `SharedPreferences`. It is important to understand that it comes in two different implementations: `Preferences DataStore` and `Proto DataStore`. `Preferences DataStore` uses key-value pairs similar to `SharedPreferences`, but it's more robust and handles runtime exceptions more efficiently. On the other hand, `Proto DataStore` uses custom data types to provide type safety. It lets you leverage the power of Protocol Buffers, a language-neutral, platform-neutral mechanism for serializing structured data, as the data storage format. Operating on data in `DataStore` is transactional, meaning that if an error occurs during an operation, all changes are rolled back, so the data remains in a consistent state.

Visit the following resources to learn more:

- [@official@Documentation](https://developer.android.com/topic/libraries/architecture/datastore)
- [@video@Introduction to DataStore](https://www.youtube.com/watch?v=9ws-cJzlJkU&list=PLWz5rJ2EKKc8to3Ere-ePuco69yBUmQ9C)
