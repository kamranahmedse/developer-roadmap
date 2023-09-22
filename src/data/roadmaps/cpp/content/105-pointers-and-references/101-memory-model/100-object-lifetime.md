# Object Lifetime in C++

Object lifetime refers to the time during which an object exists, from the moment it is created until it is destroyed. In C++, an object's lifetime can be classified into four categories:

- **Static Storage Duration**: Objects with static storage duration exist for the entire run of the program. These objects are allocated at the beginning of the program's run and deallocated when the program terminates. Global variables, static data members, and static local variables fall into this category.

    ```cpp
    int global_var;            // Static storage duration
    class MyClass {
      static int static_var;   // Static storage duration
    };
    void myFunction() {
      static int local_var;    // Static storage duration
    }
    ```

- **Thread Storage Duration**: Objects with thread storage duration exist for the lifetime of the thread they belong to. They are created when a thread starts and destroyed when the thread exits. Thread storage duration can be specified using the `thread_local` keyword.

    ```cpp
    thread_local int my_var;   // Thread storage duration
    ```

- **Automatic Storage Duration**: Objects with automatic storage duration are created at the point of definition and destroyed when the scope in which they are declared is exited. These objects are also known as "local" or "stack" objects. Function parameters and local non-static variables fall into this category.

    ```cpp
    void myFunction() {
      int local_var;           // Automatic storage duration
    }
    ```

- **Dynamic Storage Duration**: Objects with dynamic storage duration are created at runtime, using memory allocation functions such as `new` or `malloc`. The lifetime of these objects must be managed manually, as they are not automatically deallocated when the scope is exited. Instead, it is the programmer's responsibility to destroy the objects using the `delete` or `free` functions when they are no longer needed, to avoid memory leaks.

    ```cpp
    int* ptr = new int;        // Dynamic storage duration
    delete ptr;
    ```

Understanding object lifetimes is essential for managing memory efficiently in C++ programs and avoiding common issues like memory leaks and undefined behavior.

Keep in mind that a proper understanding of constructors and destructors for classes is also essential when working with objects of varying lifetimes, as they allow you to control the behavior of object creation and destruction.