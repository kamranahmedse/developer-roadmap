# Explicit Intents

**Explicit Intents** are primarily used within an application's own boundaries. In explicit intents you specify the component that needs to be responded to the intent. Therefore, the target component must be specified by calling methods such as `setComponent(ComponentName)`, `setClass(Context, Class)`, or `setClassName(String, String)`. This means that explicit intents are typically used for launching activities, broadcasting messages, starting services within the app. Explicit intents are not resolved by the system but are passed to the component identified in the intent.

Visit the following resources to learn more:

- [@official@Explicit Intents](https://developer.android.com/guide/components/intents-filters#explicit)
