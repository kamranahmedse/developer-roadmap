# Multithreading in C++

Multithreading is the concurrent execution of multiple threads within a single process or program. It improves the performance and efficiency of an application by allowing multiple tasks to be executed in parallel.

In C++, multithreading support is available through the `thread` library introduced in the C++11 standard.

## Basic Thread Creation

To create a new thread, include the `<thread>` header file and create an instance of `std::thread` that takes a function as an argument. The function will be executed in a new thread.

```cpp
#include <iostream>
#include <thread>

void my_function() {
    std::cout << "This function is executing in a separate thread\n";
}

int main() {
    std::thread t(my_function);
    t.join(); // waits for the thread to complete
    return 0;
}
```

## Thread with Arguments

You can pass arguments to the thread function by providing them as additional arguments to the `std::thread` constructor.

```cpp
#include <iostream>
#include <thread>

void print_sum(int a, int b) {
    std::cout << "The sum is: " << a + b << std::endl;
}

int main() {
    std::thread t(print_sum, 3, 5);
    t.join();
    return 0;
}
```

## Mutex and Locks

When multiple threads access shared resources, there is a possibility of a data race. To avoid this, use mutex and locks to synchronize shared resource access.

```cpp
#include <iostream>
#include <mutex>
#include <thread>

std::mutex mtx;

void print_block(int n, char c) {
    {
        std::unique_lock<std::mutex> locker(mtx);
        for (int i = 0; i < n; ++i) {
            std::cout << c;
        }
        std::cout << std::endl;
    }
}

int main() {
    std::thread t1(print_block, 50, '*');
    std::thread t2(print_block, 50, '$');

    t1.join();
    t2.join();

    return 0;
}
```

This short introduction should help you get started with basic multithreading techniques in C++. There is a lot more to learn, such as thread pools, condition variables, and atomic operations for advanced synchronization and performance tuning.