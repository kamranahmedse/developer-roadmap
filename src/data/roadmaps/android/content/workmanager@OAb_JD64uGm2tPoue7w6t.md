# WorkManager

`WorkManager` is an Android library introduced by Google to execute tasks in a predictable and reliable manner. It's designed for tasks that require guaranteed execution, even if the app has been closed or the device restarts. It is backwards compatible up to API 14 and uses JobScheduler for API 23 and above, whilst using a combination of BroadcastReceiver + AlarmManager for APIs 14 and up. Regardless of the device API level, WorkManager works for all Android devices. Three types of work are supported by WorkManager - OneTimeWorkRequest, PeriodicWorkRequest, and DelayedWorkRequest.

Visit the following resources to learn more:

- [@official@WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager)
