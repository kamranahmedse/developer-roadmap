# DeepLinking

To handle incoming links, you need to handle 2 scenarios:

If the app wasn't previously open, the deep link needs to set the initial state
If the app was already open, the deep link needs to update the state to reflect the incoming link
React Native provides a Linking to get notified of incoming links. React Navigation can integrate with the Linking module to automatically handle deep links. On Web, React Navigation can integrate with browser's history API to handle URLs on client side. See configuring links to see more details on how to configure links in React Navigation.

While you don't need to use the linking prop from React Navigation, and can handle deep links yourself by using the Linking API and navigating from there, it'll be significantly more complicated than using the linking prop which handles many edge cases for you.

## Setup with Expo projects

First, you will want to specify a URL scheme for your app. This corresponds to the string before :// in a URL, so if your scheme is example then a link to your app would be example:

```//. You can register for a scheme in your app.json by adding a string under the scheme key:

{
  "expo": {
    "scheme": "example"
  }
}
```

Next, install expo-linking which we'd need to get the deep link prefix:

```npx expo install expo-linking```

Then, let's configure React Navigation to use the scheme for parsing incoming deep links:

### STATIC
```
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

/* content */

function App() {
  const linking = {
    prefixes: [prefix],
  };

  return <Navigation linking={linking} />;
}
```

### DYNAMIC
```
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {/* content */}
    </NavigationContainer>
  );
}
```

It is necessary to use Linking.createURL since the scheme differs between the Expo Dev Client and standalone apps.

The scheme specified in app.json only applies to standalone apps. In the Expo client app you can deep link using exp:```//ADDRESS:PORT/--/``` where ADDRESS is often ```127.0.0.1``` and PORT is often 19000 - the URL is printed when you run expo start. The Linking.createURL function abstracts it out so that you don't need to specify them manually.

If you are using universal links, you need to add your domain to the prefixes as well:

```
const linking = {
  prefixes: [Linking.createURL('/'), 'https://app.example.com'],
};
```

## Universal Links on Expo

To set up iOS universal Links in your Expo app, you need to configure your app config to include the associated domains and entitlements:

```
{
  "expo": {
    "ios": {
      "associatedDomains": ["applinks:app.example.com"],
      "entitlements": {
        "com.apple.developer.associated-domains": ["applinks:app.example.com"]
      }
    }
  }
}
```

## App Links on Expo

To set up Android App Links in your Expo app, you need to configure your app config to include the intentFilters:
```
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "app.example.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}

```

You will also need to declare the association between your website and your intent filters by hosting a Digital Asset Links JSON file.



To get more information, consult the following links:
- https://reactnavigation.org/docs/deep-linking/?config=dynamic
- https://docs.expo.dev/linking/android-app-links/
- https://docs.expo.dev/linking/ios-universal-links/
