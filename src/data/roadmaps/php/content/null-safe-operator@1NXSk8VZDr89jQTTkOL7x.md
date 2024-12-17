# Null Safe Operator

The Null Safe Operator is a handy feature in PHP which deals with an issue that often pops up when working with objects: trying to access properties or methods on an object that might be null. Instead of a fatal error, the PHP Null Safe Operator (indicated by ?->) allows null values to be returned safely, making your code more robust. Here's a quick example, consider $session?->user?->name. If $session or user is null, PHP will stop further execution and simply return null. This makes PHP more resilient when processing unpredictable data.

Visit the following resources to learn more:

- [@official@Null Safe Operator](https://www.php.net/manual/en/language.oop5.nullsafe.php)