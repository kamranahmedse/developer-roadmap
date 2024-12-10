# cURL

cURL is a flexible way to make requests to external servers from within a PHP script. cURL, which stands for Client URL, is a library that facilitates various types of network communication methods based on different types of URLs. You can, for example, use cURL functions in PHP to access REST APIs, download files, or post form data, among other things. Here's a basic PHP cURL example where we fetch data from an API:

```php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://example.com/api/data");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($ch);

if(curl_errno($ch)){
   echo 'Error:' . curl_error($ch);
}

curl_close($ch);
```
In this code, we initialize a cURL session, set its options, execute it, then close the session. We also included error handling. PHP's cURL functions are documented in detail at [PHP.net](https://www.php.net/manual/en/book.curl.php).
