# Non-Copyable

The non-copyable idiom is a C++ design pattern that prevents objects from being copied or assigned. It's usually applied to classes that manage resources, like file handles or network sockets, where copying the object could cause issues like resource leaks or double deletions.

To make a class non-copyable, you need to delete the copy constructor and the copy assignment operator. This can be done explicitly in the class declaration, making it clear to other programmers that copying is not allowed.

Here's an example of how to apply the non-copyable idiom to a class:

```cpp
class NonCopyable {
public:
  NonCopyable() = default;
  ~NonCopyable() = default;

  // Delete the copy constructor
  NonCopyable(const NonCopyable&) = delete;

  // Delete the copy assignment operator
  NonCopyable& operator=(const NonCopyable&) = delete;
};
```

To use the idiom, simply inherit from the `NonCopyable` class:

```cpp
class MyClass : private NonCopyable {
  // MyClass is now non-copyable
};
```

This ensures that any attempt to copy or assign objects of `MyClass` will result in a compilation error, thus preventing unwanted behavior.