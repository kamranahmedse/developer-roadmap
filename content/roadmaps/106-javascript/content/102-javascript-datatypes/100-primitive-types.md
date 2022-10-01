# Primitive Types

In JavaScript, a primitive (primitive value, primitive data type) is data that is not an object and has no methods or properties. There are 7 primitive data types:

- `string` : In JavaScript, there are 3 types of quotes.
             Double quotes: "Hello".
             Single quotes: 'Hello'.
             Backticks: `Hello`.
             Double and single quotes are “simple” quotes. There’s practically no difference between them in JavaScript.
             Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in ${…}, for example
             
- `number`: The number type represents both integer and floating point numbers.
            There are many operations for numbers, e.g. multiplication *, division /, addition +, subtraction -, and so on.
            Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: Infinity, -Infinity and NaN.
            
- `bigint`: BigInt type was recently added to the language to represent integers of arbitrary length.
            A BigInt value is created by appending n to the end of an integer:


- `boolean`: The boolean type has only two values: true and false.
             This type is commonly used to store yes/no values: true means “yes, correct”, and false means “no, incorrect”.
             
- `undefined`: The special value undefined also stands apart. It makes a type of its own, just like null.
               The meaning of undefined is “value is not assigned”.
               If a variable is declared, but not assigned, then its value is undefined
               
- `Symbol` : The symbol type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the                    details  till we know objects.

- `null` : In JavaScript, null is not a “reference to a non-existing object” or a “null pointer” like in some other languages.
           It’s just a special value which represents “nothing”, “empty” or “value unknown”. 

Most of the time, a primitive value is represented directly at the lowest level of the language implementation.

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://developer.mozilla.org/en-US/docs/Glossary/Primitive'>Primitive</BadgeLink>
