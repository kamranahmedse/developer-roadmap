# Environment Variables

Environment variables provide a way to influence the behavior of software on your system. They consist of name/value pairs and are used for various purposes, such as to specify directory paths, usernames, or passwords that your PHP application might use. You can set PHP environment variables using the `putenv()` function, and retrieve them using `getenv()`. For example, if you want to set the environment variable "FOO" to "bar", you could do so like this:

```php
putenv("FOO=bar");
```

And then you can retrieve the value with `getenv()` like:

```php
echo getenv("FOO"); // returns "bar"
```

Keep in mind that environment variables set using `putenv()` are only available for the duration of the current request. If you want them to persist for future requests, you'll need to set them using your system's method for setting environment variables. More on this at the [official PHP documentation](https://www.php.net/manual/en/function.putenv.php).