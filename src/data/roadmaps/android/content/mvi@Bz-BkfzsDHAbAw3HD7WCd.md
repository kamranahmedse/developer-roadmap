# MVI

The **MVI** `Model-View-Intent` pattern is a reactive architectural pattern, similar to **MVVM** and **MVP**, focusing on immutability and handling states in unidirectional cycles. The data flow is unidirectional: Intents update the Model's state through the `ViewModel`, and then the View reacts to the new state. This ensures a clear and predictable cycle between logic and the interface.

- Model: Represents the UI state. It is immutable and contains all the necessary information to represent a screen.
- View: Displays the UI state and receives the user's intentions.
- Intent: The user's intentions trigger state updates, managed by the `ViewModel`.

Visit the following resources to learn more:

- [@article@MVI with Kotlin](https://proandroiddev.com/mvi-architecture-with-kotlin-flows-and-channels-d36820b2028d)
