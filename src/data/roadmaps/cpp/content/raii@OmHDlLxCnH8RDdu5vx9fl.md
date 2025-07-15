# RAII (Resource Acquisition Is Initialization)

RAII is a popular idiom in C++ that focuses on using the object's life cycle to manage resources. It encourages binding the resource lifetime to the scope of a corresponding object so that it's automatically acquired when an object is created and released when the object is destroyed. This helps in simplifying the code, avoiding leaks and managing resources efficiently.

## Code Examples

Here's an example of using RAII to manage resources, specifically a dynamically allocated array:

```cpp
class ManagedArray {
public:
    ManagedArray(size_t size) : size_(size), data_(new int[size]) {
    }

    ~ManagedArray() {
        delete[] data_;
    }

    // Access function
    int& operator [](size_t i) {
        return data_[i];
    }

private:
    size_t size_;
    int* data_;
};
```

Usages:

```cpp
{
    ManagedArray arr(10);
    arr[0] = 42;

    // No need to explicitly free memory, it will be automatically released when arr goes out of scope.
}
```

Another common use case is managing a mutex lock:

```cpp
class Lock {
public:
    Lock(std::mutex& mtx) : mutex_(mtx) {
        mutex_.lock();
    }

    ~Lock() {
        mutex_.unlock();
    }

private:
    std::mutex& mutex_;
};
```

Usages:

```cpp
std::mutex some_mutex;

void protected_function() {
    Lock lock(some_mutex);

    // Do some work that must be synchronized

    // No need to explicitly unlock the mutex, it will be automatically unlocked when lock goes out of scope.
}
```

In both examples, the constructor acquires the resource (memory for the array and the lock for the mutex), and the destructor takes care of releasing them. This way, the resource management is tied to the object's lifetime, and the resource is correctly released even in case of an exception being thrown.