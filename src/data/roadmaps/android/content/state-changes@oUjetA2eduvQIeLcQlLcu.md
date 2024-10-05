# State Changes

"Activity" is a crucial component that represents a single screen with a user interface. One or more active activities make up an Application. These activities can go through different states in their lifecycle, often due to user interaction or system interruption. The primary states of an Activity include `Created`, `Started`, `Resumed`, `Paused`, `Stopped`, `Restarted`, and `Destroyed`. The "Created" state occurs when an activity instance is being created. The "Started" state is when the activity is visible to the user, while "Resumed" is when the activity is interacting with the user. An activity is "Paused" when it loses focus but is partly visible, "Stopped" when it's not visible, "Restarted" when the activity is about to be started, and "Destroyed" when the activity is finished or the system is temporarily destroying it.

Visit the following resources to learn more:

- [@official@Activity Lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)
