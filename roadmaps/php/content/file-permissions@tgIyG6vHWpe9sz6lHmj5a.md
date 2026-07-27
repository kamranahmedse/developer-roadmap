# File Permissions

File permissions in PHP control who can read, write, and execute a file. They're crucial for the security and proper functioning of your PHP applications. When working with files, you can use functions like `chmod()`, `is_readable()`, and `is_writable()` to manage permissions. Typically, you would use `chmod()` to change the permissions of a file. The first parameter is the name of the file and the second parameter is the mode. For instance, `chmod($file, 0755)` would assign owner permissions to read, write, and execute, while everyone else would only have read and execute permissions. To know if a file is readable or writable, use `is_readable()` or `is_writable()` respectively.

Visit the following resources to learn more:

- [@official@Filesystem Functions](https://www.php.net/manual/en/ref.filesystem.php)