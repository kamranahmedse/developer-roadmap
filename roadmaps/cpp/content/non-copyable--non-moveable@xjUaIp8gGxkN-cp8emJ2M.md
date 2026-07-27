# Non-Copyable / Non-Moveable

The non-copyable/non-moveable idiom in C++ prevents objects of a class from being copied or moved. This is achieved by deleting the copy constructor, copy assignment operator, move constructor, and move assignment operator. It's useful for classes that manage exclusive resources, ensuring that only one instance controls the resource at a time, preventing issues like resource duplication or double deletion. By disabling copying and moving, you enforce a unique ownership model for instances of the class.

Visit the following resources to learn more:

- [@article@Dealing with non-copyable objects - (C++ Tutorial)](https://dev.to/dabretema/the-day-i-forbade-copy-semantics-to-an-object-nkl)