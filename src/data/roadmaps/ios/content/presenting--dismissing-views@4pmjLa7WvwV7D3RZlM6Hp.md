# Presenting / Dismissing views

SwiftUI offers several methods for presenting and dismissing views, providing flexible options for modal presentations and navigation. Sheets can be presented using the .sheet() modifier, allowing full or partial screen overlays. For alerts and action sheets, .alert() and .actionSheet() modifiers are used. Popovers are created with the .popover() modifier, typically for iPad interfaces. Full-screen covers use the .fullScreenCover() modifier. 

To dismiss these presented views, SwiftUI uses the @Environment(\.presentationMode) property wrapper, allowing views to dismiss themselves. For navigation-based presentations, NavigationLink handles showing new views, while the .navigationBarItems() modifier can add dismiss functionality. These tools enable developers to create diverse and interactive user interfaces with smooth transitions between different view states.

Learn more from the following resources:

- [@official@sheet(ispresented) Documentation]
- [@official@dismiss Documentation](https://developer.apple.com/documentation/swiftui/environmentvalues/dismiss)
(https://developer.apple.com/documentation/swiftui/view/sheet(ispresented:ondismiss:content:))
- [@article@How to present a new view using sheets](https://www.hackingwithswift.com/quick-start/swiftui/how-to-present-a-new-view-using-sheets)
- [@article@How to make a view dismiss itself](https://www.hackingwithswift.com/quick-start/swiftui/how-to-make-a-view-dismiss-itself)

