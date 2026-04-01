# Copy and Swap

Copy and Swap is a C++ idiom used to implement the assignment operator in a safe and efficient manner. It works by creating a copy of the right-hand side object, then swapping the internal state of the copy with the object being assigned to. The temporary copy, now holding the original state, is then destroyed when the function exits, ensuring proper resource management and exception safety. This leverages existing copy constructors and swap functions, leading to cleaner and more robust code.

Visit the following resources to learn more:

- [@video@Copying and Copy Constructors in C++](https://www.youtube.com/watch?v=BvR1Pgzzr38)