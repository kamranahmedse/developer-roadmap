# Avoid Passing Nulls Booleans

Passing nulls or Booleans can lead to unexpected behavior and difficult-to-debug errors in a program. Here are some ways to avoid passing nulls or Booleans in system architecture:

- Use Optionals or Maybe types instead of nulls to indicate the absence of a value. This makes it clear when a value is missing and prevents null reference exceptions.
- Use a default value for function arguments instead of allowing them to be null or Boolean. This eliminates the need to check for null or Boolean values and reduces the potential for errors.
- Use the Null Object pattern to replace null values with a special object that has a defined behavior. This eliminates the need to check for null values and makes the code more readable.
- Use the Ternary operator (?:) instead of if-else statements when working with Booleans. This can make the code more concise and easier to read.
- Use the assert function to check the validity of function arguments and throw an exception if they are invalid.

By following these best practices, the system architecture will be more robust and less error-prone.
