# Modal

Modals are containers appearing in front of the main content to provide critical information or an actionable piece of content.

- **Supports any type of Content:** Like any other container, modals can be used in different scenarios and you should be able to use it with any other component inside.
- **Supplementary Actions:** Since content in the modal may be actionable, it’s important to have an area for action elements. This area is usually located at the bottom of the modal container.
- **Close Action:** Modals should provide a clear way to be closed as they’re blocking content when open. This may be either a separate close button or one of the supplementary actions.
- **Information Structure:** Even though modals can be used as an empty container for the content, they need a defined information structure to provide a holistic experience. It may include defining how titles and subtitles look by default or where an action element’s area is.
- **Keyboard Navigation Support:** It should be possible to close a modal by pressing the Esc key and all the focusable elements inside the modal container should be accessible with keyboard navigation.
- **Focus Trapping:** Once a modal is opened, the focus should be moved to the first element inside the modal and should be looped within the modal container. Closing the modal should return the focus to the last focused element on the page.
