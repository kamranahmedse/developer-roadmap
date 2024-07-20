# User Defaults

User Defaults in iOS provides a convenient way to store small amounts of key-value data persistently across app launches. It's primarily used for saving user preferences, app settings, and other lightweight data. The `UserDefaults` class offers a standardized interface to interact with the defaults system, allowing easy storage and retrieval of basic data types like strings, numbers, dates, and even more complex objects that conform to the Codable protocol. Data stored in User Defaults is automatically persisted to disk, making it readily available in subsequent app launches. While User Defaults is easy to use and efficient for small datasets, it's not suitable for storing large amounts of data or sensitive information. It's important to use User Defaults judiciously, as overuse can impact app launch times and performance. For more complex data structures or larger datasets, other persistence mechanisms like Core Data or file-based storage are more appropriate.

Learn more from the following resources:

- [@official@UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults)
- [@article@Reading and Writing basics: UserDefaults](https://www.hackingwithswift.com/read/12/2/reading-and-writing-basics-userdefaults)
- [@video@Reading and Writing basics: UserDefaults](https://www.youtube.com/watch?v=WHKLXI8baJk&t=1s)