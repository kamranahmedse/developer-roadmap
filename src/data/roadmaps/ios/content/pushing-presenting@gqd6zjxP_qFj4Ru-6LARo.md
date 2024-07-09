# Pushing Presenting

Pushing adds a new view controller to the top of the navigation stack, ideal for hierarchical navigation. It's done using navigationController?.pushViewController(_:animated:), which slides the new view in from the right and adds a back button.

Presenting displays a view controller modally, often covering the entire screen or as a sheet. It's achieved using present(_:animated:completion:), suitable for temporary or standalone content.

Learn more from the following resources:

- [@article@Pushing, Popping, Presenting, & Dismissing ViewControllers](https://medium.com/@felicity.johnson.mail/pushing-popping-dismissing-viewcontrollers-a30e98731df5)
- [@opensource@presentViewController vs pushViewController](https://github.com/russell-archer/ModalStylesDemo)
- [@article@UINavigationController.PushViewController](https://learn.microsoft.com/en-us/dotnet/api/uikit.uinavigationcontroller.pushviewcontroller?view=xamarin-ios-sdk-12)