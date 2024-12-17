# File Uploads

Uploading files in PHP is a commonly used functionality for many applications. This is typically done using the `$_FILES` superglobal array that allows you to manage uploaded files in your PHP script. It contains details like `name`, `type`, `size` etc of the file. An index is also present for each file in the case of multiple uploads. The `move_uploaded_file()` function is then used to move the uploaded file to the desired directory.

Don't forget to pay attention to security considerations when accepting file uploads.

Visit the following resources to learn more:

- [@official@File Uploads](https://www.php.net/manual/en/features.file-upload.php)