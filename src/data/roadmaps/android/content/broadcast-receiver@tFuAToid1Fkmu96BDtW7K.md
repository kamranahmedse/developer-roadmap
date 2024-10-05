# Broadcast Receiver

**Broadcast Receivers** in Android are components that respond to system-wide broadcast announcements. They can be registered to respond to a specific type of broadcasts or implement a user-defined broadcast. While you can initiate a broadcast from your app, they are generally used for receiving system notifications or communicating with other applications. However, keep in mind that they cannot display a user interface, but they can start activities if necessary, which do have a user interface. A `BroadcastReceiver` class must override the `onReceive()` method where each message is received as an `Intent` object parameter.

Visit the following resources to learn more:

- [@official@Broadcast Receiver](https://developer.android.com/reference/android/content/BroadcastReceiver)
