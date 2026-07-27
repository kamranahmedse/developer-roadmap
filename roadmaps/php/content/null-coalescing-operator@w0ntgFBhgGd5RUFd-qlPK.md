# Null Coalescing Operator

The Null Coalescing Operator (??) in PHP is a simple and useful tool for handling variables that might not be set. It allows developers to provide a default value when the variable happens not to have a value. It is similar to the ternary operator, but instead of checking whether a variable is true or false, it checks if it is set or null. This makes it a handy tool for handling optional function arguments or form inputs. Here's an example: `$username = $_POST['username'] ?? 'Guest';`. In this line, if 'username' was set in the POST array, $username will be set to that value. If not, it will be set to 'Guest'.

Visit the following resources to learn more:

- [@official@Null Coalescing Operator](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.null-coalesce-op)