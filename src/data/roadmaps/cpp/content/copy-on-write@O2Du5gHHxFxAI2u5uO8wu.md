# Copy-Write Idiom

The Copy-Write idiom, sometimes called the Copy-on-Write (CoW) or "lazy copying" idiom, is a technique used in programming to minimize the overhead of copying large objects. It helps in reducing the number of actual copy operations by using shared references to objects and only copying the data when it's required for modification.

Let's understand this with a simple example:

```cpp
#include <iostream>
#include <memory>

class MyString {
public:
    MyString(const std::string &str) : data(std::make_shared<std::string>(str)) {}

    // Use the same shared data for copying.
    MyString(const MyString &other) : data(other.data) { 
        std::cout << "Copied using the Copy-Write idiom." << '\n';
    }

    // Make a copy only if we want to modify the data.
    void write(const std::string &str) {
        // Check if there's more than one reference.
        if (data.use_count() > 1) {
            data = std::make_shared<std::string>(*data);
            std::cout << "Copy is actually made for writing." << '\n';
        }
        *data = str;
    }

private:
    std::shared_ptr<std::string> data;
};

int main() {
    MyString str1("Hello");
    MyString str2 = str1; // No copy operation, just shared references.

    str1.write("Hello, World!"); // This is where the actual duplication happens.
    return 0;
}
```

In this example, we have a class `MyString` that simulates the Copy-Write idiom. When a `MyString` object is created, it constructs a `shared_ptr` pointing to a string. When a `MyString` object is copied, it does not perform any actual copy operation, but simply increases the reference count of the shared object. Finally, when the `write` function is called, it checks if there's more than one reference to the data and if so, it actually creates a new copy and updates the reference. This way, unnecessary copies can be avoided until they are actually needed for modification.