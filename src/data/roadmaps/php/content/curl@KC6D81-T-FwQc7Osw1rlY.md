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

Visit the following resources to learn more:

- [@official@cURL](https://curl.se/)
- [@opensource@curl/curl](https://github.com/curl/curl)
- [@official@cURL in PHP](https://www.php.net/manual/en/book.curl.php)