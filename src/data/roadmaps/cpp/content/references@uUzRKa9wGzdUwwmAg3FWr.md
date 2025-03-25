# References
A reference can be considered as a constant pointer (not to be confused with a pointer to a constant value) which always points to (references) the same object. They are declared using the `&` (ampersand) symbol.

## Declaration and Initialization
To declare a reference, use the `&` symbol followed by the variable type and the reference's name. Note that you must initialize a reference when you declare it.

```cpp
int var = 10;        // Declare an integer variable
int& ref = var;      // Declare a reference that "points to" var
```

## Usage
You can use the reference just like you'd use the original variable. When you change the value of the reference, the value of the original variable also changes, because they both share the same memory location.

```cpp
var = 20;            // Sets the value of var to 20
std::cout << ref << '\n'; // Outputs 20

ref = 30;            // Sets the value of ref to 30
std::cout << var << '\n'; // Outputs 30
```

## Function Parameters
You can use references as function parameters to create an alias for an argument. This is commonly done when you need to modify the original variable or when passing an object of considerable size to avoid the cost of copying.
```cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
   int x = 5, y = 10;
   std::cout << "Before Swap: x = " << x << " y = " << y << '\n'; // Outputs 5 10
   
   swap(x, y);
   std::cout << "After Swap: x = " << x << " y = " << y << '\n';  // Outputs 10 5
}
```
