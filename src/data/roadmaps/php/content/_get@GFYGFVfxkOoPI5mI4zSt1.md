# $_GET

$_GET is a pre-defined array in PHP, that's used to collect form-data sent through HTTP GET method. It's useful whenever you need to process or interact with data that has been passed in via a URL's query string. For an example if you have a form with a GET method, you can get the values of the form elements through this global $_GET array. Here’s an example: 

```php
<form method="get" action="test.php">
  Name: <input type="text" name="fname">
  <input type="submit">
</form>
```

Using $_GET, you can fetch the 'fname' value from the URL:

```php
echo "Name is: " . $_GET['fname'];
```

Visit the following resources to learn more:

- [@official@PHP Documentation](https://www.php.net/manual/en/reserved.variables.get.php)