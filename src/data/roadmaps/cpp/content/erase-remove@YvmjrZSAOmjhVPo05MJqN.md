# Erase-Remove

The Erase-Remove idiom is a common C++ technique used to efficiently remove elements from a container (like `std::vector`, `std::list`, etc.). It involves using `std::remove` (or `std::remove_if`) to move the elements to be removed to the end of the container, followed by using the container's `erase()` method to actually remove those elements, effectively shrinking the container.