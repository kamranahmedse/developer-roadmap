# expo-secure-store

Expo Secure Store is a built-in package provided by the Expo SDK to store encrypted data securely on users' devices. It is a key-value storage system, but it is not designed to store larger amounts of data such as app databases or complex data structures. It is most appropriate for storing secret keys, access tokens, and small user preferences.

First, you need to install the package by running:

```bash
expo install expo-secure-store
```

Then, import the module into your app:

```javascript
import * as SecureStore from 'expo-secure-store';
```

## Saving Data

To save data to the secure store, use the `setItemAsync` method. It takes two arguments: a key and a value. Both should be strings.

```javascript
async function saveData() {
  try {
    await SecureStore.setItemAsync('your_key', 'your_value');
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}
```

## Retrieving Data

To retrieve data from the secure store, use the `getItemAsync` method, which takes the key as a parameter and returns a Promise that resolves to the value.

```javascript
async function getData() {
  try {
    const value = await SecureStore.getItemAsync('your_key');
    if (value !== null) {
      console.log('Data retrieved:', value);
    } else {
      console.log('No data found with that key.');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}
```

## Deleting Data

To delete data from the secure store, use the `deleteItemAsync` method. It takes the key as a parameter.

```javascript
async function deleteData() {
  try {
    await SecureStore.deleteItemAsync('your_key');
    console.log('Data deleted successfully!');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
```

Please note that Expo Secure Store uses different security mechanisms based on the platform (iOS or Android). Additionally, while the store is encrypted, remember that it is not foolproof, and a determined attacker may be able to extract data. However, it provides a good balance between security and usability for most use cases.