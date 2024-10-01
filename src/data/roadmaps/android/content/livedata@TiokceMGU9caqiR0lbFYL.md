# LiveData

`LiveData` is a data holder class that can be observed within a given lifecycle. This means that an `Observer` can be added in a pair with a `LifecycleOwner`, and this observer will be notified about modifications of the `LiveData` object only if the associated `LifecycleOwner` is in active state. `LiveData` respects the lifecycle state of app components, such as activities, fragments, or services, and it only updates app-component observers that are in an active lifecycle state. Furthermore, `LiveData` automatically removes the observers when their associated `LifecycleOwner` moves to the `Destroyed` state. This combination of `LiveData` and `LifecycleOwner` helps you to manage appropriate and efficient updates because `LiveData` takes into consideration the lifecycle state of your app components.

Visit the following resources to learn more:

- [@official@LiveData](https://developer.android.com/topic/libraries/architecture/livedata)
