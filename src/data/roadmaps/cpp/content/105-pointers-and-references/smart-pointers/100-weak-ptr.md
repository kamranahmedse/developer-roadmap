# Weak Pointer

A `weak_ptr` is a type of smart pointer in C++ that adds a level of indirection and safety to a raw pointer. It is mainly used to break reference cycles in cases where two objects have shared pointers to each other, or when you need a non-owning reference to an object that is managed by a `shared_ptr`.

A `weak_ptr` does not increase the *ownership* reference count of the object it points to, which is a key difference between `weak_ptr` and `shared_ptr`. The control block associated with the object maintains two counts: one for the number of `shared_ptr`s (ownership count) and another for the number of `weak_ptr`s (weak count). The existence of `weak_ptr`s does not prevent the object from being deleted; the object is destroyed once the last `shared_ptr` that owns it is destroyed or reset, even if `weak_ptr`s are still referencing the object. However, the control block itself is not deallocated until both the ownership count reaches zero and the weak count also reaches zero, allowing `weak_ptr`s to safely detect whether the object has already been deleted.

To use a `weak_ptr`, you must convert it to a `shared_ptr` using the `lock()` function, which tries to create a new `shared_ptr` that shares ownership of the object. If successful, the object's reference count is increased and you can use the returned `shared_ptr` to safely access the object.

Here's an example of using `weak_ptr`:

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    void DoSomething() {
        std::cout << "Doing something...\n";
    }
};

int main() {
    std::weak_ptr<MyClass> weak;

    {
        std::shared_ptr<MyClass> shared = std::make_shared<MyClass>();
        weak = shared;

        if (auto sharedFromWeak = weak.lock()) {
            sharedFromWeak->DoSomething(); // Safely use the object
            std::cout << "Shared uses count: " << sharedFromWeak.use_count() << '\n'; // 2
        }
    }

    // shared goes out of scope and the MyClass object is destroyed

    if (auto sharedFromWeak = weak.lock()) {
        // This block will not be executed because the object is destroyed
    }
    else {
        std::cout << "Object has been destroyed\n";
    }

    return 0;
}
```

In this example, we create a `shared_ptr` named `shared` that manages a `MyClass` object. By assigning it to a `weak_ptr` named `weak`, we store a non-owning reference to the object. Inside the inner scope, we create a new `shared_ptr` named `sharedFromWeak` using `weak.lock()` to safely use the object. After the inner scope, the `MyClass` object is destroyed since `shared` goes out of scope, and any further attempt to create a `shared_ptr` from `weak` will fail as the object is already destroyed.

Learn more from the following resources:

- [@article@CPP Reference](https://en.cppreference.com/w/cpp/memory/weak_ptr)
