# Expo File System

Expo File System is a universal module that provides access to the file system on the device. Using this module, you can perform various file operations like reading, writing, copying, moving, and deleting files and folders. It also supports reading file metadata and querying file URI.

To use the Expo File System library, you need to install the `expo-file-system` package:

```bash
expo install expo-file-system
```

First, import the `expo-file-system` module:

```javascript
import * as FileSystem from 'expo-file-system';
```

Here are some examples of how to use the Expo File System:

## Reading a file

```javascript
async function readFileAsync() {
    const fileUri = FileSystem.documentDirectory + 'myFile.txt';

    try {
        const content = await FileSystem.readAsStringAsync(fileUri);
        console.log('File content:', content);
    } catch (error) {
        console.error('Error while reading file:', error);
    }
}
```

## Writing a file

```javascript
async function writeFileAsync() {
    const fileUri = FileSystem.documentDirectory + 'myFile.txt';
    const content = 'Hello, World!';

    try {
        await FileSystem.writeAsStringAsync(fileUri, content);
        console.log('File written successfully');
    } catch (error) {
        console.error('Error while writing file:', error);
    }
}
```

## Copying & Moving a file

```javascript
async function copyAndMoveFileAsync() {
    const srcUri = FileSystem.documentDirectory + 'myFile.txt';
    const destUri = FileSystem.documentDirectory + 'copiedFile.txt';

    try {
        await FileSystem.copyAsync({ from: srcUri, to: destUri });
        console.log('File copied successfully');

        const newDestUri = FileSystem.documentDirectory + 'movedFile.txt';
        await FileSystem.moveAsync({ from: destUri, to: newDestUri });
        console.log('File moved successfully');
    } catch (error) {
        console.error('Error while copying/moving file:', error);
    }
}
```

## Deleting a file

```javascript
async function deleteFileAsync() {
    const fileUri = FileSystem.documentDirectory + 'myFile.txt';

    try {
        await FileSystem.deleteAsync(fileUri);
        console.log('File deleted successfully');
    } catch (error) {
        console.error('Error while deleting file:', error);
    }
}
```

I hope this brief summary of Expo File System helps you understand its functionality and usage. Remember to visit the [official documentation](https://docs.expo.dev/versions/latest/sdk/filesystem/) for more details and other available features.