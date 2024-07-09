# Modals and Navigation

UIKit navigation stacks support both modal presentations and hierarchical navigation:

Modal presentations temporarily overlay new content using present(_:animated:completion:). They're suitable for self-contained tasks or information that doesn't fit the main navigation hierarchy.

Hierarchical navigation uses push and pop operations on the navigation stack. pushViewController(_:animated:) adds a new screen, while popViewController(animated:) returns to the previous one.

These can be combined: a modal can contain its own navigation stack, or a screen in the main navigation can present a modal. This flexibility allows developers to create complex navigation patterns that maintain clarity and context for users, adapting to various app structures and user flow requirements.

Learn more from the following resources:

- [@official@animate(withDuration:animations:completion:)](https://developer.apple.com/documentation/uikit/uiview/1622515-animate)
- [@officialpushViewController](https://developer.apple.com/documentation/uikit/uinavigationcontroller/1621887-pushviewcontroller)
- [@video@UIKit Programmatic Navigation](https://www.youtube.com/watch?v=c0YSGtFmik8)