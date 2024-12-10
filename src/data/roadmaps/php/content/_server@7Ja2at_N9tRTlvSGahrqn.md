# $_SERVER

The `$_SERVER` is a superglobal in PHP, holding information about headers, paths, and script locations. $_SERVER is an associative array containing server variables created by the web server. This can include specific environmental configurations, the server signature, your PHP script's paths and details, client data, and the active request/response sequence. Among its many uses, `$_SERVER['REMOTE_ADDR']` can help get the visitor's IP while `$_SERVER['HTTP_USER_AGENT']` offers information about their browser. Don't forget to sanitize the content before use to prevent security exploits. 

Here's an easy code sample that prints the client's IP:

```php
echo 'Your IP is: ' . $_SERVER['REMOTE_ADDR'];
```

Visit the following resources to learn more:

- [@official@PHP Documentation](https://www.php.net/reserved.variables.server)