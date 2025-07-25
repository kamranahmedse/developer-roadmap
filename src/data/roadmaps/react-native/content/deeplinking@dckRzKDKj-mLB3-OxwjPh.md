# DeepLinking

Deep linking in React Native allows your app to navigate directly to specific screens using URLs. This is essential for handling links from emails, notifications, websites, or other apps that should open a particular screen within your app (e.g., `myapp://profile/42`).

There are two types of deep links:

Custom URL Schemes – Works with schemes like `myapp://`. Requires configuration in `AndroidManifest.xml` and `Info.plist`.

Universal Links / App Links – Use `https://` links tied to your domain. They require domain verification and provide a better user experience, especially on iOS.

React Native provides the Linking API to handle incoming URLs, and React Navigation simplifies the process with built-in support. You can define a linking configuration with URL prefixes and screen mappings, then pass it to the NavigationContainer.

Basic setup steps:

Configure native deep link support (scheme or domain).

Define a linking object in React Navigation.

Use `Linking.getInitialURL()` and listeners to handle URLs manually if needed.

This setup ensures users are routed to the right screen whether the app is open, in the background, or completely closed.

Visit the following resources to learn more:

- [Understanding deep linking in React Native](https://blog.logrocket.com/understanding-deep-linking-in-react-native/)
- [Deep Linking in React Native: Navigating to Specific App Screens](https://clouddevs.com/react-native/deep-linking/)
- [A Complete Guide to Deep Linking with Custom domain in React Native](https://dev.to/amitkumar13/a-complete-guide-to-deep-linking-with-custom-domain-in-react-native-bj3)
