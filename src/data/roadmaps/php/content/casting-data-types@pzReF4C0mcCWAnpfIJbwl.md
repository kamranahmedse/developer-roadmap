# Casting Data Types

PHP, as a loose typing language, allows us to change the type of a variable or to transform an instance of one data type into another. This operation is known as Casting. When to use casting, however, depends on the situation - it is recommendable when you want explicit control over the data type for an operation. The syntax involves putting the intended type in parentheses before the variable. For example, if you wanted to convert a string to an integer, you'd use: `$myVar = "123"; $intVar = (int) $myVar;`. Here, `$intVar` would be an integer representation of `$myVar`. Remember, the original variable type remains unchanged. 

Visit the following resources to learn more:

- [@official@Official Documentation - Type Casting](https://www.php.net/manual/en/language.types.type-juggling.php)