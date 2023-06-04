# C++ Standards

C++ standards are a set of rules and guidelines that define the language's features, syntax, and semantics. The International Organization for Standardization (ISO) is responsible for maintaining and updating the C++ standards. The main purpose of the standards is to ensure consistency, efficiency, and maintainability across multiple platforms and compilers.

Here's a brief summary of the different C++ standards released to date:

- **C++98/C++03**: The first standardized version of C++, which introduced many features like templates, exceptions, and the Standard Template Library (STL). C++03 is a minor update to C++98 with some bug fixes and performance improvements.

- **C++11**: A major upgrade to the language, which introduced features such as:
   - Lambda expressions:
   ```cpp
   auto sum = [](int a, int b) -> int { return a + b; };
   ```
   - Range-based for loops:
   ```cpp
   std::vector<int> numbers = {1, 2, 3, 4};
   for (int num : numbers) {
       std::cout << num << std::endl;
   }
   ```
   - Smart pointers like `std::shared_ptr` and `std::unique_ptr`.
 
- **C++14**: A minor update to C++11, which added features such as:
   - Generic lambda expressions:
   ```cpp
   auto generic_sum = [](auto a, auto b) { return a + b; };
   ```
   - Binary literals:
   ```cpp
   int binary_number = 0b1010;
   ```

- **C++17**: Another major update that introduced features such as:
   - `if` and `switch` with initializers:
   ```cpp
   if (auto it = my_map.find(key); it != my_map.end()) {
       // use 'it' here
   }
   ```
   - Structured bindings:
   ```cpp
   std::map<std::string, int> my_map = {{"A", 1}, {"B", 2}};
   for (const auto& [key, value] : my_map) {
       // use 'key' and 'value' here
   }
   ```
  
- **C++20**: The latest major update to the language, with features such as:
   - Concepts:
   ```cpp
   template<typename T>
   concept Addable = requires(T a, T b) {
       { a + b } -> std::same_as<T>;
   };
   ```
   - Ranges:
   ```cpp
   std::vector<int> numbers = {1, 2, 3, 4};
   auto doubled = numbers | std::views::transform([](int n) { return n * 2; });
   ```
   - Coroutines and more.

Remember that to use these language features, you might need to configure your compiler to use the specific C++ standard version. For example, with GCC or Clang, you can use the `-std=c++11`, `-std=c++14`, `-std=c++17`, or `-std=c++20` flags.