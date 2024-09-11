# MVI - Model View Intent

The **MVI** `Model-View-Intent` pattern is a reactive architectural pattern, similar to **MVVM** and **MVP**, but with a focus on immutability and handling states in unidirectional cycles. In MVI:

- Model: Represents the UI state. It is immutable and contains all the necessary information to represent a screen.
- View: Displays the UI state and receives the user's intentions.
- Intent: These are the user's intentions that trigger state updates, managed by the `ViewModel`.

The data flow is unidirectional: Intents update the Model's state through the `ViewModel`, and then the View reacts to the new state. This ensures a clear and predictable cycle between logic and the interface.
