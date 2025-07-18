📄 C++ new and delete Operators – Documentation
🔍 Overview
C++ provides dynamic memory management using the new and delete operators, which allow developers to allocate and deallocate memory at runtime from the heap.

These operators replace the traditional C-style malloc() and free() functions with a type-safe and object-oriented approach.

✅ Syntax
Allocation with new
cpp
Copy
Edit
type* pointer = new type;           // Single object
type* arrayPointer = new type[size]; // Array of objects
Deallocation with delete
cpp
Copy
Edit
delete pointer;          // Single object
delete[] arrayPointer;   // Array of objects
📘 Examples
📌 Example 1: Allocate and Free a Single Object
cpp
Copy
Edit
#include <iostream>
using namespace std;

int main() {
    int* num = new int;  // dynamically allocate an integer
    *num = 42;

    cout << "Value: " << *num << endl;

    delete num;  // free memory
    return 0;
}
📌 Example 2: Allocate and Free an Array
cpp
Copy
Edit
#include <iostream>
using namespace std;

int main() {
    int size = 5;
    int* arr = new int[size];  // dynamically allocate array

    for (int i = 0; i < size; ++i) {
        arr[i] = i * 2;
    }

    for (int i = 0; i < size; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;

    delete[] arr;  // free memory
    return 0;
}
⚠️ Important Notes
Always pair new with delete and new[] with delete[]. Mixing them causes undefined behavior.

If you forget to delete, it causes a memory leak.

Always set the pointer to nullptr after deletion to avoid dangling pointers.

cpp
Copy
Edit
delete ptr;
ptr = nullptr;
🧠 Advanced: Custom new and delete (Overloading)
You can overload new and delete for custom memory management:

cpp
Copy
Edit
void* operator new(size_t size) {
    cout << "Custom new: " << size << " bytes" << endl;
    return malloc(size);
}

void operator delete(void* ptr) {
    cout << "Custom delete" << endl;
    free(ptr);
}
📌 Conclusion
The new and delete operators provide safe, type-aware, and object-oriented memory management in C++. When used correctly, they give fine-grained control over memory allocation, which is essential in systems and performance-critical applications.
