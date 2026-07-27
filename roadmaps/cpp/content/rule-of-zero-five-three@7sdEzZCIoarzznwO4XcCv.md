# Rule of Zero, Five, Three

The Rule of Zero, Three, and Five are guidelines for managing resources within C++ classes and structs. The Rule of Zero suggests letting the compiler handle resource management if your class doesn't explicitly manage any. If your class manages resources, pre-C++11 it adhered to the Rule of Three, requiring you to define a destructor, copy constructor, and copy assignment operator. Modern C++ with move semantics extends this to the Rule of Five, which adds a move constructor and move assignment operator to efficiently transfer ownership of resources.

Visit the following resources to learn more:

- [@article@The rule of three/five/zero](https://en.cppreference.com/w/cpp/language/rule_of_three.html)
- [@article@The Rule of 0/3/5](https://medium.com/@Farhan11637/the-rule-of-0-3-5-2e608a717811)