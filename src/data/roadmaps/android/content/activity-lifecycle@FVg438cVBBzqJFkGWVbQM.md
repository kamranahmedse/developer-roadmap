# Activity Lifecycle

The **Activity Lifecycle** in Android represents a series of states or events that an activity can go through from its creation to its destruction. The primary states or events are `onCreate()`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, `onDestroy()`, and `onRestart()`. The method `onCreate()` is called when the activity is first created, followed by `onStart()` when the activity becomes visible to the user. The `onResume()` method executes when the user starts interacting with the application. `onPause()` and `onStop()` methods are invoked when the application is no longer in the foreground or visible to the user. The `onDestroy()` method is used when the activity is being completely removed from the memory. The `onRestart()` method is called after the system stops the activity and is about to start it again. The proper handling of these states ensures the efficient use of resources and a smooth user experience.

Visit the following resources to learn more:

- [@official@Activity Lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)
