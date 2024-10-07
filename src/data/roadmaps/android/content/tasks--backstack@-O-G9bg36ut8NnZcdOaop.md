# Tasks and Backstack

The **tasks backstack** in Android refers to the way Android manages and arranges tasks in a stack-like structure. Every task has a stack of activities, which is referred to as the task's back stack. The activities are placed in the order they are opened. When a new activity is started, it is placed at the top of the stack and becomes the running activity, while the previous activity is paused and put into the back stack. When you press the back button, the current activity is destroyed and the activity at the top of the back stack becomes active again. Android defines how to navigate between tasks and activities using this back stack concept.

Visit the following resources to learn more:

- [@official@Tasks and Backstack](https://developer.android.com/guide/components/activities/tasks-and-back-stack)
