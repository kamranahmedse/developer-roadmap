# Input Radio

An input radio is a form element used for selecting one option from a list.

- **Checked State:** Used when the radio is selected and will use its value for the form submission. A radio input can’t be unselected by pressing it again.
- **Disabled State:** Prevents radio interactions and removes its value from the form submission.
- **Label:** There should be a text label linked with the radio field. Clicking the label should also trigger the radio selection.
- **Error State:** The error state is used for form validation errors when the error is related to the radio field only. Always use a text error along with changing the colour of the field.
- **Keyboard State:** A radio selection should be triggered when the Space key is pressed. Using native elements for this should provide this kind of interaction out of the box.
- **Radio Group:** Radio inputs should always be used in a group. If one of them is selected, it can be deselected only by choosing another radio.
