# C++ Newest Standard: C++20

C++20 is the newest standard of the C++ programming language, which was officially published in December 2020. It introduces many new features, enhancements, and improvements over the previous standards. Here is a brief summary of some key features in C++20.

- **Concepts**: Concepts provide a way to specify constraints on template parameters, ensuring that they meet a specific set of requirements. This allows for better compile-time error messages and code readability.

   Example:
   ```
   template<typename T>
   concept Printable = requires(T x) {
       {std::cout << x};
   };

   template<Printable T>
   void print(const T& x) {
       std::cout << x << '\n';
   }
   ```

- **Ranges**: Ranges build on the iterator concept and provide a more usable and composable framework for dealing with sequences of values. They simplify the way algorithms can be applied to collections of data.

   Example:
   ```
   #include <iostream>
   #include <vector>
   #include <ranges>

   int main() {
       std::vector<int> numbers{1, 2, 3, 4, 5};
       auto even_view = numbers | std::views::filter([](int n) { return n % 2 == 0; });

       for (int n : even_view) {
           std::cout << n << ' ';
       }
   }
   ```

- **Coroutines**: Coroutines offer a way to split complex, long-running functions into smaller, more manageable chunks, allowing them to be suspended and resumed at specific points.

   Example:
   ```
   #include <iostream>
   #include <coroutine>

   std::generator<int> generator() {
       for (int i = 0; i < 5; ++i)
           co_yield i;
   }

   int main() {
       for (int value : generator())
           std::cout << value << ' ';
   }
   ```

- **Lambdas with template parameters**: C++20 enables using `auto` as a lambda parameter, allowing for generic lambdas with templated parameters.

   Example:
   ```
   auto sum = [](auto a, auto b) {
       return a + b;
   };

   int res1 = sum(1, 2);           // int
   double res2 = sum(1.0, 2.0);    // double
   ```

- **Constexpr enhancements**: `constexpr` support is extended with additional features, such as `constexpr` dynamic allocations, `constexpr` try-catch blocks, and `constexpr` lambdas.

   Example:
   ```
   struct Point {
       constexpr Point(int x, int y): x_{x}, y_{y} {}
       int x_, y_;
   };

   constexpr auto create_points() {
       Point points[3]{};

       for (int i = 0; i < 3; ++i) {
           points[i] = Point{i, i * i};
       }

       return points;
   }

   constexpr auto points = create_points();
   ```

There are many other features in C++20, such as new standard library improvements, `std::format`, improvements to compile-time programming, and more. These are just a few highlights that showcase the versatility and power of the newest standard of C++.