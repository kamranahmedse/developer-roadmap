# Toast

Toasts provide short meaningful feedback messages about the action results.

- **Dismissed Automatically:** Toast messages shouldn’t interrupt the user flow, block the screen for a long time or require additional action from the user.
- **Action Support:** Besides displaying the message, toasts may also provide an action related to the message like undoing an action.
- **Handles Multiple Instances:** Even though it doesn’t happen often, toasts can be called from multiple sources at the same time and all resulting toasts should be queued. It’s good practice not to show all the messages at the same time.
- **Accessibility:** Toast messages should be announced by the voice assistive technology and their action should be easily accessible from the keyboard.
- **Responsivenss:** Toasts should be aligned with the mobile viewport and their action should be easily reachable for tapping.
