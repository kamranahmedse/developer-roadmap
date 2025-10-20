# Pointers

A pointer is a variable that stores the memory address of another variable (or function). It points to the location of the variable in memory, and it allows you to access or modify the value indirectly. Here's a general format to declare a pointer:

```cpp
dataType *pointerName;
```

**Initializing a pointer:**

```cpp
int num = 10;
int *ptr = &num;  // Pointer 'ptr' now points to the memory address of 'num'
```

**Accessing value using a pointer:**

```cpp
int value = *ptr; // Value now contains the value of the variable that 'ptr' points to (i.e., 10)
```

**Function pointer:**

```cpp
int add(int a, int b)
{
  return a + b;
}

int main()
{
  int (*funcptr) (int, int) = add; // Pointer 'funcptr' now points to the functions 'add'
  funcptr(4, 5); // Return 9
}
``` 

## References

A reference is an alias for an existing variable, meaning it's a different name for the same memory location. Unlike pointers, references cannot be null, and they must be initialized when they are declared. Once a reference is initialized, it cannot be changed to refer to another variable.

Here's a general format to declare a reference:

```cpp
dataType &referenceName = existingVariable;
```

**Example:**

```cpp
int num = 10;
int &ref = num; // Reference 'ref' is now an alias of 'num'
```

Modifying the value of `ref` will also modify the value of `num` because they share the same memory location.

**Note:** References are generally used when you want to pass a variable by reference in function arguments or when you want to create an alias for a variable without the need for pointer syntax.

# Constant Pointers and Pointers to Constants in C++

In C++, the placement of the `const` keyword in a pointer declaration changes its meaning. Let’s go through the three main cases.

---

## 1. Constant Pointer
A **constant pointer** means the pointer itself cannot change the address it holds after initialization, but the value at that address can still be modified.

**Syntax:**
```cpp
int x = 10;
int y = 20;
int* const ptr = &x;   // Constant pointer to int

*ptr = 15;             // ✅ Allowed: we can change the value of x
// ptr = &y;           // ❌ Error: cannot make ptr point to y
```

👉 **Rule:**  
- You **cannot change** what it points to.  
- You **can change** the value at the address.

---

## 2. Pointer to Constant
A **pointer to constant** means the pointer can change to point to different addresses, but the value at the address cannot be modified through this pointer.

**Syntax:**
```cpp
int x = 10;
int y = 20;
const int* ptr = &x;   // Pointer to constant int

// *ptr = 15;          // ❌ Error: cannot modify x through ptr
ptr = &y;              // ✅ Allowed: can point to another variable
```

👉 **Rule:**  
- You **can change** what it points to.  
- You **cannot change** the value at the address through this pointer.

---

## 3. Constant Pointer to Constant
A **constant pointer to constant** means neither the pointer nor the value it points to can be changed.

**Syntax:**
```cpp
int x = 10;
int y = 20;
const int* const ptr = &x;   // Constant pointer to constant int

// *ptr = 15;                // ❌ Error: cannot modify x
// ptr = &y;                 // ❌ Error: cannot make ptr point to y
```

👉 **Rule:**  
- You **cannot change** what it points to.  
- You **cannot change** the value at the address through this pointer.

---

## Summary Table

| Declaration              | Can change pointer? | Can change value? |
|---------------------------|----------------------|-------------------|
| `int* const ptr`          | ❌ No               | ✅ Yes            |
| `const int* ptr`          | ✅ Yes              | ❌ No             |
| `const int* const ptr`    | ❌ No               | ❌ No             |

---

## Rule of Thumb

- `int* const ptr` → constant **pointer**, mutable **pointee**.  
- `const int* ptr` → mutable **pointer**, constant **pointee**.  
- `const int* const ptr` → constant **pointer**, constant **pointee**.  


Learn more from the following resources:

- [@article@Function Pointer in C++](https://www.scaler.com/topics/cpp/function-pointer-cpp/)
