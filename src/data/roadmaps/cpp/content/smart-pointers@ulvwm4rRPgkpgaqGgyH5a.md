# Smart Pointers
Smart pointers are classes in C++ that manage dynamically allocated memory (memory from the heap) automatically. They prevent memory leaks by ensuring that memory is deallocated when the smart pointer object goes out of scope. They operate on the principle of RAII (Resource Acquisition Is Initialization).

## Types of Smart Pointers
There are three main types, each with a distinct ownership model:

### `std::unique_ptr`
**Ownership**: Exclusive. Only one unique_ptr can own an object at a time.

**Copying**: Cannot be copied.

**Transfer**: Ownership can be transferred using std::move.

**Use Case**: Ideal when an object has a single, clear owner.

```C++

std::unique_ptr<int> ptr1(new int(5));
std::unique_ptr<int> ptr2 = std::move(ptr1); // Transfers ownership
// ptr1 is now null
```
### `std::shared_ptr`
**Ownership**: Shared. Multiple shared_ptr objects can own the same object.

**Mechanism**: Uses a reference count to track the number of owners.

**Deallocation**: The memory is freed only when the last shared_ptr owning the object is destroyed.

**Use Case**: Useful when multiple parts of a program need to share access to the same object.

```C++

std::shared_ptr<int> ptr1 = std::make_shared<int>(10); // count = 1
std::shared_ptr<int> ptr2 = ptr1; // count = 2
// Memory is deallocated when both ptr1 and ptr2 go out of scope or are reset
```
### `std::weak_ptr`
**Ownership**: Non-owning. It holds a weak reference to an object managed by a shared_ptr.

**Purpose**: Used to break circular references between shared_ptrs, which would otherwise cause memory leaks.

**Access**: You cannot directly access the object. You must convert it to a shared_ptr using the lock() method.

**Deallocation**: Does not affect the reference count of the object it points to.

**Use Case**: Preventing memory leaks in complex object graphs where a cycle of ownership exists.

```C++

std::shared_ptr<int> sp = std::make_shared<int>(20);
std::weak_ptr<int> wp = sp;
// To use:
if (auto locked_sp = wp.lock()) {
    // locked_sp can be used to access the object
}
```
