# Buttons

A `button` consists of text or an icon, or both, that communicates what action occurs when the user taps it.

## Usage

- Xml
```xml
 <Button
     android:id="@+id/button_id"
     android:layout_height="wrap_content"
     android:layout_width="wrap_content"
     android:text="@string/self_destruct" />
```
- Activity
```kotlin
findViewById<Button>(R.id.supabutton)
  .setOnClickListener {
      Log.d("BUTTONS", "User tapped the Supabutton")
  }
```

Learn more from the following resources:

- [@official@Android Developers: Button](https://developer.android.com/develop/ui/views/components/button)