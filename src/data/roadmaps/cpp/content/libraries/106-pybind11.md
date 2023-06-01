# Pybind11

Pybind11 is a lightweight header-only library that seamlessly integrates C++ code with Python, allowing users to easily expose C++11 code to the Python ecosystem. This is achieved by providing `Python` bindings that can interact with functions and classes written in `C++`. It offers an API similar to the Boost.Python library but requires less code, thus leading to better performance.

Pybind11 helps in creating library extensions, bringing high-performance C++ code into Python programs, and using Python's flexibility for rapid development while still benefiting from the efficiency of C++.

#### Code Examples

Here are a few examples of Pybind11 for understanding the concept better:

- Exposing a C++ function to Python:

```cpp
#include <pybind11/pybind11.h>

int add(int a, int b) {
    return a + b;
}

PYBIND11_MODULE(example, m) {
    m.def("add", &add, "A function that adds two numbers");
}
```

Running the above example will create a Python module named `example`, containing a single function `add`. You can use this new function in Python as follows:

```python
import example

result = example.add(1, 2)
print(result)  # Output: 3
```

- Exposing a C++ class to Python:

```cpp
#include <pybind11/pybind11.h>

namespace py = pybind11;

class MyTestClass {
public:
    MyTestClass(const std::string &name) : name_(name) { }

    const std::string &name() const { return name_; }
    void setName(const std::string &name) { name_ = name; }

private:
    std::string name_;
};

PYBIND11_MODULE(example, m) {
    py::class_<MyTestClass>(m, "MyTestClass")
        .def(py::init<const std::string &>())
        .def("name", &MyTestClass::name)
        .def("setName", &MyTestClass::setName);
}
```

After compiling the code and importing it into Python, you can create `MyTestClass` instances and call their `name()` and `setName(string)` methods:

```python
import example

obj = example.MyTestClass("some_name")
print(obj.name())  # Output: some_name

obj.setName("new_name")
print(obj.name())  # Output: new_name
```