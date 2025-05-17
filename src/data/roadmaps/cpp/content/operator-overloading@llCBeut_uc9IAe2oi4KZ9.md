# Operator Overloading in C++

Operator overloading in C++ is a feature that allows you to redefine the way operators work for user-defined types (such as classes and structs). It lets you specify how operators like +, -, *, ==, etc., behave when applied to objects of your class.

### Example
```cpp
#include <iostream>
#include <string>
using namespace std;

class MyString {
    string str;
public:
    MyString(string s = "") : str(s) {}

    // Overload + operator to concatenate strings
    MyString operator+(const MyString& other) {
        return MyString(str + other.str);
    }

    void display() {
        cout << str << endl;
    }
};

int main() {
    MyString s1("Hello, ");
    MyString s2("World!");
    MyString s3 = s1 + s2; // Using overloaded + operator
    s3.display();          // Output: Hello, World!
    return 0;
}
```
In this example, the + operator is overloaded to combine the str members of two MyString objects, `s1` and `s2`. The result is a new MyString object `s3` containing the concatenated string.

Visit the following resources to learn more:

- [@official@Operator Overloading - Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/operator-overloading)
- [@article@Operator Overloading in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/operator-overloading-cpp/)
- [@article@operator overloading - cppreference.com](https://en.cppreference.com/w/cpp/language/operators)
