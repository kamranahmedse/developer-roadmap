# Observer Pattern

The **Observer Pattern** is a software design pattern in which an object, known as the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes. This is usually done by calling one of their methods. It's mainly used for implementing distributed event handling systems and is viewed as a good practice to follow, making your design more robust, flexible, and scalable. The subject to be observed triggers events and observers react to the change or the event that they are listening to. In Android, observable libraries like `LiveData`, `RxJava`, `Flow`, and other reactive streams allow the implementation of observer pattern.

Visit the following resources to learn more:

- [@article@Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
