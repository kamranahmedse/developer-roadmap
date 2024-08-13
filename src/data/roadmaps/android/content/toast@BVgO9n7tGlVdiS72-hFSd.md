# Toast

A `toast` provides simple feedback about an operation in a small popup. It only fills the amount of space required for the message and the current activity remains visible and interactive. Toasts automatically disappear after a timeout.

Preview: 
![Toast android](https://developer.android.com/static/images/toast.png)

Use:
```kotlin
val text = "Hello toast!"
val duration = Toast.LENGTH_SHORT

val toast = Toast.makeText(this, text, duration) // in Activity
toast.show()
```

Visit the following resources to learn more:

- [@article@Android developers: Toast](https://developer.android.com/guide/topics/ui/notifiers/toasts)
