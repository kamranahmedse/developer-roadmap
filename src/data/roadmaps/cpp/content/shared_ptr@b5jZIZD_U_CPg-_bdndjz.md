# Shared Pointer in C++

## Introduction
In C++, memory management can be tricky. If you allocate memory dynamically using `new`, you are responsible for freeing it with `delete`. Forgetting to do so causes memory leaks, while deleting it too early can lead to undefined behavior.  
To simplify memory management, C++ introduced **smart pointers**, which automatically manage the lifetime of dynamically allocated objects.  

One of the most commonly used smart pointers is **`std::shared_ptr`**.

## Concept Behind `shared_ptr`
A `shared_ptr` is a smart pointer that maintains **shared ownership** of a dynamically allocated object.  
- Multiple `shared_ptr` instances can point to the same object.  
- The object is automatically destroyed when the **last `shared_ptr`** pointing to it is destroyed or reset.  

This is achieved using **reference counting**. Internally, `shared_ptr` keeps a counter of how many smart pointers currently share ownership of the object.

## When to Use `shared_ptr`
You should use `shared_ptr` when:
- You need multiple parts of a program to share ownership of a resource.  
- The resource must stay alive as long as at least one owner exists.  
- Manual memory management would otherwise be complex and error-prone.  

Avoid using `shared_ptr` if:
- You only need **unique ownership** → Use `std::unique_ptr`.  
- You need non-owning access → Use `std::weak_ptr` to avoid circular references.  
- Performance is critical → Reference counting has a small overhead.  

## Example Demo

```cpp
#include <iostream>
#include <memory>

class Demo {
public:
    Demo(const std::string& name) : name_(name) {
        std::cout << "Constructing " << name_ << std::endl;
    }
    ~Demo() {
        std::cout << "Destructing " << name_ << std::endl;
    }
    void greet() {
        std::cout << "Hello from " << name_ << std::endl;
    }
private:
    std::string name_;
};

int main() {
    std::shared_ptr<Demo> ptr1 = std::make_shared<Demo>("Object A");
    
    {
        std::shared_ptr<Demo> ptr2 = ptr1;  // Shared ownership
        std::cout << "Use count: " << ptr1.use_count() << std::endl;

        ptr2->greet();
    } // ptr2 goes out of scope, but ptr1 still owns the object

    std::cout << "Use count after block: " << ptr1.use_count() << std::endl;

    return 0;
}
