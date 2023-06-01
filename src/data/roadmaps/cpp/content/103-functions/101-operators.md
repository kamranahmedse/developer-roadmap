# Operators in C++

Operators in C++ are symbols that perform various operations on data, such as arithmetic, comparison, and logical operations. They are used to manipulate and evaluate expressions and variables.

Here is a list of the commonly used operator types in C++:

- **Arithmetic Operators**: These are used for performing arithmetic operations like addition, subtraction, multiplication, and division.

   - `+`: addition
     ```cpp
     int sum = 5 + 3; // sum will be 8
     ```
   - `-`: subtraction
     ```cpp
     int difference = 5 - 3; // difference will be 2
     ```
   - `*`: multiplication
     ```cpp
     int product = 5 * 3; // product will be 15
     ```
   - `/`: division
     ```cpp
     int quotient = 15 / 3; // quotient will be 5
     ```
   - `%`: modulo (remainder)
     ```cpp
     int remainder = 7 % 3; // remainder will be 1
     ```

- **Comparison (Relational) Operators**: These are used to compare two values and return true or false based on the comparison.

   - `==`: equal to
     ```cpp
     bool isEqual = (5 == 3); // isEqual will be false
     ```
   - `!=`: not equal to
     ```cpp
     bool isNotEqual = (5 != 3); // isNotEqual will be true
     ```
   - `<`: less than
     ```cpp
     bool isLess = (5 < 3); // isLess will be false
     ```
   - `>`: greater than
     ```cpp
     bool isGreater = (5 > 3); // isGreater will be true
     ```
   - `<=`: less than or equal to
     ```cpp
     bool isLessOrEqual = (5 <= 3); // isLessOrEqual will be false
     ```
   - `>=`: greater than or equal to
     ```cpp
     bool isGreaterOrEqual = (5 >= 3); // isGreaterOrEqual will be true
     ```

- **Logical Operators**: These operators are used to perform logical operations such as AND (&&), OR (||), and NOT (!) on boolean values.

   - `&&`: logical AND
     ```cpp
     bool result = (true && false); // result will be false
     ```
   - `||`: logical OR
     ```cpp
     bool result = (true || false); // result will be true
     ```
   - `!`: logical NOT
     ```cpp
     bool result = !false; // result will be true
     ```

- **Assignment Operators**: These are used to assign values to variables.

   - `=`: simple assignment
     ```cpp
     int x = 5; // x gets the value 5
     ```
   - `+=`: addition assignment
     ```cpp
     int x = 5;
     x += 3; // x gets the value 8 (5 + 3)
     ```
   - `-=`: subtraction assignment
     ```cpp
     int x = 5;
     x -= 3; // x gets the value 2 (5 - 3)
     ```
   - `*=`: multiplication assignment
     ```cpp
     int x = 5;
     x *= 3; // x gets the value 15 (5 * 3)
     ```
   - `/=`: division assignment
     ```cpp
     int x = 15;
     x /= 3; // x gets the value 5 (15 / 3)
     ```
   - `%=`: modulo assignment
     ```cpp
     int x = 7;
     x %= 3; // x gets the value 1 (7 % 3)
     ```

These are some of the main operator categories in C++. Each operator allows you to perform specific operations, making your code more efficient and concise.