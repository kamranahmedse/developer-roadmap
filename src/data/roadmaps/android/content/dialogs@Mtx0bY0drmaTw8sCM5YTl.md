# Dialogs

A `DialogFragment` is a special fragment subclass that is designed for creating and hosting dialogs. Although you don't need to host your **dialog** within a fragment, doing so lets the `FragmentManager` manage the state of the dialog and automatically restore the dialog when a configuration change occurs.

## Use
- Create dialog
```kotlin
class PurchaseConfirmationDialogFragment : DialogFragment() {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog =
            AlertDialog.Builder(requireContext())
                .setMessage(getString(R.string.order_confirmation))
                .setPositiveButton(getString(R.string.ok)) { _,_ -> }
                .create()

    companion object {
        const val TAG = "PurchaseConfirmationDialog"
    }
}
```
- Show dialog
```kotlin
PurchaseConfirmationDialogFragment().show(
     childFragmentManager, PurchaseConfirmationDialog.TAG)
```

Visit the following resources to learn more:

- [@official@Android Developers: Dialogs](https://developer.android.com/guide/fragments/dialogs)