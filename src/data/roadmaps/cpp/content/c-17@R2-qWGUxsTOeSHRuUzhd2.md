# C++17

C++17, also known as C++1z, is the version of the C++ programming language published in December 2017. It builds upon the previous standard, C++14, and adds various new features and enhancements to improve the language's expressiveness, performance, and usability.

## Key Features:
- If-init-statement: Introduces a new syntax for writing conditions with scope inside if and switch statements.
```cpp
if (auto it = map.find(key); it != map.end())
{
    // Use it
}
```

- Structured Binding Declarations: Simplify the process of unpacking a tuple, pair, or other aggregate types.
```cpp
map<string, int> data;
auto [iter, success] = data.emplace("example", 42);
```

- Inline variables: Enables `inline` keyword for variables and allows single definition of global and class static variables in header files.
```cpp
inline int globalVar = 0;
```

- Folds expressions: Introduce fold expressions for variadic templates.
```cpp
template <typename... Ts>
auto sum(Ts... ts)
{
    return (ts + ...);
}
```

- constexpr if statement: Allows conditional compilation during compile time.
```cpp
template <typename T>
auto get_value(T t)
{
    if constexpr (std::is_pointer_v<T>)
    {
        return *t;
    }
    else
    {
        return t;
    }
}
```

- Improved lambda expression: Allows lambda to capture a single object without changing its type or constness.
```cpp
auto func = [x = std::move(obj)] { /* use x */ };
```

- Standard file system library: `std::filesystem` as a standardized way to manipulate paths, directories, and files.

- New Standard Library additions: `<string_view>` (non-owning string reference), `<any>` (type-erased container), `<optional>` (optional value wrapper), `<variant>` (type-safe discriminated union / sum type), and `<memory_resource>` (library for polymorphic allocators).

- Parallel Algorithms: Adds support for parallel execution of Standard Library algorithms.

This is a brief summary of the key features of C++17; it includes more features and library updates. For a complete list, you can refer to the [full list of C++17 features and changes](https://en.cppreference.com/w/cpp/17).
