# IBActions

Xcode IBActions are methods that connect user interface elements to code, allowing the app to respond to user interactions. Key features include:

1. Definition: Declared as methods in view controller classes.
2. Connection: Made by ctrl-dragging from UI elements to code in Interface Builder.
3. Purpose: Handle user interactions like button taps, slider changes, etc.
4. Method signature: Can include a sender parameter of the interacting UI element's type.
5. Multiple connections: One IBAction can be connected to multiple UI elements.
6. Event types: Can be set to respond to specific events (e.g., touch up inside, value changed).
7. Naming convention: Often prefixed with 'ib' for clarity.
8. Refactoring support: Xcode updates connections when renaming.

IBActions provide a clean way to separate UI logic from business logic, enhancing code organization. They allow developers to centralize the handling of user interactions, making it easier to manage and modify app behavior in response to user input.

Learn more from the following resources:

- [@video@IBOutlet & IBAction](https://www.youtube.com/watch?v=ztPpThdBHT0)
- [@article@From outlets to actions: creating an IBAction](https://www.hackingwithswift.com/read/2/5/from-outlets-to-actions-creating-an-ibaction)