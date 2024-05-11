# Copy and Swap

Copy-swap is a C++ idiom that leverages the copy constructor and swap function to create an assignment operator. It follows a simple, yet powerful paradigm: create a temporary copy of the right-hand side object, and swap its contents with the left-hand side object.

Here's a brief summary:

- **Copy**: Create a local copy of the right-hand side object. This step leverages the copy constructor, providing exception safety and code reuse.
- **Swap**: Swap the contents of the left-hand side object with the temporary copy. This step typically involves swapping internal pointers or resources, without needing to copy the full contents again.
- **Destruction**: Destroy the temporary copy. This happens upon the exit of the assignment operator.

Here's a code example for a simple `String` class:

```cpp
class String {
    // ... rest of the class ...

    String(const String& other);
    
    friend void swap(String& first, String& second) {
        using std::swap; // for arguments-dependent lookup (ADL)
        swap(first.size_, second.size_);
        swap(first.buffer_, second.buffer_);
    }

    String& operator=(String other) {
        swap(*this, other);
        return *this;
    }
};
```

Using the copy-swap idiom:
- The right-hand side object is copied when passed by value to the assignment operator.
- The left-hand side object's contents are swapped with the temporary copy.
- The temporary copy is destroyed, releasing any resources that were previously held by the left-hand side object.

This approach simplifies the implementation and provides strong exception safety, while reusing the copy constructor and destructor code.
