# Password Hashing

Password Hashing in PHP is a crucial aspect of security, which involves converting a plaintext password into a unique hash that cannot be easily reversed. PHP's built-in functions - `password_hash()` and `password_verify()` - are usually employed for this purpose. `password_hash()` creates a new password hash using a strong one-way hashing algorithm, while `password_verify()` checks if the given hash matches the password provided. This makes it extremely difficult for malicious actors to get the original password, even if they have the hash.

```php
// Hashing the password
$hash = password_hash('mypassword', PASSWORD_DEFAULT);

// Verifying the password
if (password_verify('mypassword', $hash)) {
    echo 'Password is valid!';
} else {
    echo 'Invalid password.';
}
```

Visit the following resources to learn more:

- [@official@Password Hashing](https://www.php.net/manual/en/function.password-hash.php)