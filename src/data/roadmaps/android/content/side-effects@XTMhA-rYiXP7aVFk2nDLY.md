# Side Effects

In Jetpack Compose, side effects are actions that occur outside the composable function itself, such as updating a database, making a network request, or using shared mutable state. Compose recomposes when its inputs change and to avoid unpredictable behaviour, any code that interacts with the outside world needs to be carefully controlled, so Side Effects is a way for doing it in a predictable and testable manner. They should be isolated and handled in a controlled way to maintain the predictability and reliability of your UI.

Visit the following resources to learn more:

- [@official@Side-effects in Compose  |  Jetpack Compose  |  Android Developers](https://developer.android.com/develop/ui/compose/side-effects)
- [@article@Complete Guide to Side Effects in Jetpack Compose](https://proandroiddev.com/complete-guide-to-side-effects-in-jetpack-compose-5be32b09514a)