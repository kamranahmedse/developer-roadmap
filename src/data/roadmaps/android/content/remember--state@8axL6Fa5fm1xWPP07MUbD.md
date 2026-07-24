# remember / State
 
remember is a Compose function that retains a value across recompositions within a composable. Combined with mutableStateOf, it creates a state holder that triggers recomposition when its value changes. Local state managed with remember is suitable for UI-only state that does not need to survive configuration changes.

Visit the following resources to learn more:

- [@official@State and Jetpack Compose](https://developer.android.com/develop/ui/compose/state)
- [@article@Understanding remember in Jetpack Compose: A Deep Dive from First Principles](https://medium.com/@sandeepkella23/understanding-remember-in-jetpack-compose-a-deep-dive-from-first-principles-2587b2098323)