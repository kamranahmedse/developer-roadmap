# References

A reference can be considered as a constant pointer (not to be confused with a pointer to a constant value) which always points to (references) the same object. They are declared using the `&` (ampersand) symbol.

Declaration and Initialization
------------------------------

To declare a reference, use the variable type followed by the `&` symbol and the reference's name. Note that you must initialize a reference when you declare it.

    int var = 10;        // Declare an integer variable
    int& ref = var;      // Declare a reference that "points to" var
    

Usage
-----

You can use the reference just like you'd use the original variable. When you change the value of the reference, the value of the original variable also changes, because they both share the same memory location.

    var = 20;            // Sets the value of var to 20
    std::cout << ref << '\n'; // Outputs 20
    
    ref = 30;            // Sets the value of ref to 30
    std::cout << var << '\n'; // Outputs 30
    

Function Parameters
-------------------

You can use references as function parameters to create an alias for an argument. This is commonly done when you need to modify the original variable or when passing an object of considerable size to avoid the cost of copying.

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
    

References in Range-based For Loops
-----------------------------------

When iterating over containers such as `std::vector<std::string>`, the choice of `auto`, `auto &`, `auto const &`, or `const auto` makes a big difference:

    std::vector<std::string> stooges {"xyz", "abc", "def"};
    
    // Read-only, no copies
    for (auto const &str : stooges)
        std::cout << str << std::endl;
    
    // Makes a copy of each string
    for (auto str : stooges)
        std::cout << str << std::endl;
    
    // Direct reference, can modify original elements
    for (auto &str : stooges)
        str += "!";
    
    // Makes a copy of each string, but prevents modification of the copy
    for (const auto str : stooges)
        std::cout << str << std::endl;
    

### Comparison

| Loop style          | Copies made? | Can modify element? | Efficiency                         | Typical use case                         |
|---------------------|--------------|---------------------|------------------------------------|------------------------------------------|
| `auto str`          | ✅ Yes        | ✅ Only the copy     | Less efficient for large objects   | When you need a local, mutable copy      |
| `auto const &str`   | ❌ No         | ❌ Read-only         | Most efficient for read-only use   | Safely read elements without copying     |
| `auto &str`         | ❌ No         | ✅ Modifies original | Efficient, mutates container       | Modify elements in place                 |
| `const auto str`    | ✅ Yes        | ❌ Read-only         | Less efficient for large objects   | Explicit read-only copy                  |


Example: Why `const auto str` Can Be Useful
-------------------------------------------

Sometimes you want to make sure you **don’t accidentally modify** the loop variable, even though it’s just a copy. Declaring it `const` ensures this safety:

    std::vector<std::string> stooges {"xyz", "abc", "def"};
    
    for (const auto str : stooges) {
        // str += "!";   // ❌ Error: str is const, cannot be modified
        std::cout << str << std::endl;  // Safe read-only copy
    }
    

This is useful when:

*   You **don’t need references** but still want to guarantee immutability inside the loop body.
*   You want to make your **intent explicit**: the loop variable should not be changed.

* * *

Rule of Thumb
-------------

*   Use **`auto const &`** for **read-only access** (best efficiency).
*   Use **`auto &`** when you need to **modify elements in place**.
*   Use **`auto`** when you need a **mutable copy**.
*   Use **`const auto`** when you want a **read-only copy** inside the loop to prevent accidental modification.

* * *

Performance Notes
-----------------

*   For **large objects** like `std::string`, `std::vector`, or custom classes, prefer **`auto const &`** to avoid unnecessary copies.
*   For **small, cheap-to-copy types** like `int`, `char`, or `bool`, using `auto` or `const auto` is fine and often simpler.
*   `auto &` should only be used when you _intend_ to modify the elements in place, since it directly mutates the container.
