A std::shared_ptr in C++ is a smart pointer provided by the C++ Standard Library that manages the lifetime of a dynamically allocated object through reference counting.
It automatically deletes the managed object when no shared_ptr points to it anymore.

Imagine you have a book in a library.
* shared_ptr is like a shared library card for that book.
* Every time someone borrows the book using that card, the counter on the card goes up.
* When someone returns the book (the shared_ptr goes out of scope), the counter goes down.
* When the counter reaches zero, it means nobody is reading the book anymore, so the library puts the book back on the shelf (deletes the memory).
```
  auto book1 = std::make_shared<int>(100); // 1 person reading
  {
    auto book2 = book1; // now 2 people reading the same book
  } // book2 leaves, 1 person left
  // when book1 also leaves, book is returned (deleted)
```
### KEY IDEA
**“We all share this object, and it goes away only when no one is using it.”**
