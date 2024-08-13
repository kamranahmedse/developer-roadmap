# Textview

TextView is a widget that is seen in every android application. This widget is used to display simple text within the android application.

## Use
- XML
```xml
<TextView
    android:id="@+id/text_view_id"
    android:layout_height="wrap_content"
    android:layout_width="wrap_content"
    android:text="@string/hello" />
```
- Activity
```java
public class MainActivity extends Activity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final TextView helloTextView = (TextView) findViewById(R.id.text_view_id);
        helloTextView.setText(R.string.user_greeting);
    }
}
```

Visit the following resources to learn more:

- [@article@Android developers: TextView](https://developer.android.com/reference/android/widget/TextView)

