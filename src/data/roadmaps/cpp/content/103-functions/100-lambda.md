# Lambda Functions in C++

A lambda function, or simply "lambda", is an anonymous (unnamed) function that is defined in place, within your source code, and with a concise syntax. Lambda functions were introduced in C++11 and have since become a widely used feature, especially in combination with the Standard Library algorithms.

## Syntax

Here is a basic syntax of a lambda function in C++:

```cpp
[capture-list](parameters) -> return_type {
    // function body
};
```

- **capture-list**: A list of variables from the surrounding scope that the lambda function can access.
- **parameters**: The list of input parameters, just like in a regular function. Optional.
- **return\_type**: The type of the value that the lambda function will return. This part is optional, and the compiler can deduce it in many cases.
- **function body**: The code that defines the operation of the lambda function.

## Usage Examples

Here are a few examples to demonstrate the use of lambda functions in C++:

- Lambda function with no capture, parameters, or return type.

```cpp
auto printHello = []() {
    std::cout << "Hello, World!" << std::endl;
};
printHello(); // Output: Hello, World!
```

- Lambda function with parameters.

```cpp
auto add = [](int a, int b) {
    return a + b;
};
int result = add(3, 4); // result = 7
```

- Lambda function with capture-by-value.

```cpp
int multiplier = 3;
auto times = [multiplier](int a) {
    return a * multiplier;
};
int result = times(5); // result = 15
```

- Lambda function with capture-by-reference.

```cpp
int expiresInDays = 45;
auto updateDays = [&expiresInDays](int newDays) {
    expiresInDays = newDays;
};
updateDays(30); // expiresInDays = 30
```

Note that, when using the capture by reference, any change made to the captured variable _inside_ the lambda function will affect its value in the surrounding scope.

Learn more from the following resources:

- [@video@Lambdas in C++](https://youtu.be/MH8mLFqj-n8)
- [@article@Lambda Expressions](https://en.cppreference.com/w/cpp/language/lambda)
- [@feed@Explore top posts about AWS Lambda](https://app.daily.dev/tags/aws-lambda?ref=roadmapsh)
