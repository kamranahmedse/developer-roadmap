# Asynchronism

Asynchronism in Android is a practice that defines operations, which can run independently from the main operation without following the program's linear flow. The Android system uses threads to handle asynchronous processes. These threads function independently, ensuring that complex or time-consuming operations do not interfere with the user interface or other essential parts of the application. Android provides various tools for carrying out asynchronous tasks, such as `Handler`, `ThreadPoolExecutor`, `IntentService`, `AsyncTask`, and `Loader` etc. These tools provide ways to execute tasks on different threads and communicate the results back to the main thread.

Visit the following resources to learn more:

- [@official@Asynchronous Tasks](https://developer.android.com/guide/background)
- [@article@Asynchronous Task Execution](https://medium.com/@cpvasani48/asynchronous-task-execution-in-android-a-guide-with-example-44732744f3b8)
