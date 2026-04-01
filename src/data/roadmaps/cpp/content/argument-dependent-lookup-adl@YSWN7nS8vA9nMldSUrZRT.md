# Argument Dependent Lookup (ADL)

Argument Dependent Lookup (ADL), also known as Koenig Lookup, is a feature in C++ that extends the function lookup process by allowing the compiler to search for functions in the namespaces of the function arguments' types. This is especially useful when working with overloaded operators and functions defined within namespaces, enabling more intuitive and concise code by automatically finding the appropriate function based on the argument types, even if it's not explicitly qualified.

Visit the following resources to learn more:

- [@article@Argument Dependent Lookup (ADL)](https://en.cppreference.com/w/cpp/language/adl.html)
- [@video@C++ Weekly - Ep 160 - Argument Dependent Lookup (ADL)](https://backoffice.roadmap.sh/tree/cpp)