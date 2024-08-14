# Toast

A `toast` provides simple feedback about an operation in a small popup. It only fills the amount of space required for the message and the current activity remains visible and interactive. Toasts automatically disappear after a timeout.

```kotlin
val toast = Toast.makeText(this, "Hello toast!", Toast.LENGTH_SHORT)
toast.show()
```

Visit the following resources to learn more:

- [@article@Android developers: Toast](https://developer.android.com/guide/topics/ui/notifiers/toasts)
