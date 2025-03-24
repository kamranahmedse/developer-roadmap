# C++11 and C++14 ###

**C++11**
The C++11 standard, also known as C++0x, was officially released in September 2011. It introduced several new language features and improvements, including:

- **Auto**: Allows compiler to infer the variable type based on its initializing expression.
  ```cpp
  auto integer = 42; // integer is of int type
  auto floating = 3.14; // floating is of double type
  ```

- **Range-Based for Loop**: Provides foreach-like semantics for iterating through a container or array.
  ```cpp
  std::vector<int> numbers {1, 2, 3, 4};
  for (int number : numbers) {
      std::cout << number << '\n';
  }
  ```

- **Lambda Functions**: Anonymous functions that allow the creation of function objects more easily.
  ```cpp
  auto add = [](int a, int b) -> int { return a + b; };
  int sum = add(42, 13); // sum is equal to 55
  ```

- **nullptr**: A new keyword to represent null pointers, more type-safe than using a literal '0' or "NULL".
  ```cpp
  int *ptr = nullptr;
  ```

- **Thread Support Library**: Provides a standard way to work with threads and synchronize data access across threads.
  ```cpp
  std::thread t([]() { std::cout << "Hello from another thread\n"; });
  t.join();
  ```

**C++14**
The C++14 standard was officially released in December 2014 as a small extension over C++11, focusing more on fine-tuning language features and fixing issues. Some of the new features introduced:

- **Generic Lambdas**: Allows lambda function parameters to be declared with 'auto' type placeholders.
  ```cpp
  auto add = [](auto a, auto b) { return a + b; };
  auto sum_i = add(42, 13); // Still works with integers
  auto sum_f = add(3.14, 2.72); // Now works with doubles too
  ```

- **Binary Literals**: Allow you to input integers as binary literals for better readability.
  ```cpp
  int b = 0b110101; // Decimal value is 53
  ```

- **decltype(auto)**: Deduces the type of variable to match that of the expression it is initialized with.
  ```cpp
  auto func = [](auto a, auto b) { return a * b; };
  decltype(auto) result = func(5, 3.14); // decltype(auto) deduces to "double"
  ```

- **Variable Templates**: Allows you to define variables with template parameters.
  ```cpp
  template <typename T>
  constexpr T pi = T(3.1415926535897932385);
  float r = pi<float>; // Instantiated as a float
  double d = pi<double>; // Instantiated as a double
  ```