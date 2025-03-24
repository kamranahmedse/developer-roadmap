# C++0x

`cpp0x` refers to the working name for [C++11](https://en.cppreference.com/w/cpp/11), which was previously known as C++0x before its final release. C++11 is a major revision of the C++ language standard, published in 2011, and brought several new features and improvements to the language.

Some of the notable features in C++11 include:

- **Auto** keyword for automatic type inference.

  ```cpp
  auto i = 42; // i is an int
  auto s = "hello"; // s is a const char*
  ```

- **Range-based for loop** for easier iteration over containers.

  ```cpp
  std::vector<int> vec = {1, 2, 3};
  for (int i : vec) {
      std::cout << i << std::endl;
  }
  ```

- **Lambda functions** for creating anonymous functions.

  ```cpp
  auto add = [](int a, int b) { return a + b; };
  int result = add(3, 4); // result is 7
  ```

- **nullptr** for representing null pointer values, instead of using `NULL`.

  ```cpp
  int* p = nullptr;
  ```

- **Rvalue references and move semantics** to optimize the handling of temporary objects.

  ```cpp
  std::string str1 = "hello";
  std::string str2 = std::move(str1); // move the content of str1 to str2
  ```

- **Variadic templates** for creating templates that take a variable number of arguments.

  ```cpp
  template <typename... Args>
  void printArgs(Args... args) {
      // function body
  }
  ```

- **Static assertions** for compile-time assertions.

  ```cpp
  static_assert(sizeof(int) == 4, "This code requires int to be 4 bytes.");
  ```

- **Thread support** for multithreading programming.

  ```cpp
  #include <thread>
  
  void my_function() {
      // thread function body
  }
  
  int main() {
      std::thread t(my_function);
      t.join();
      return 0;
  }
  ```

These are just a few examples of the many new features introduced in C++11. For a comprehensive list, you can refer to the [C++11 documentation](https://en.cppreference.com/w/cpp/11).