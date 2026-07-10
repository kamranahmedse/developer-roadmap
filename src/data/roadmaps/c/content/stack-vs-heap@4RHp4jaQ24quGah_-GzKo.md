# Stack vs Heap

The stack is a region of memory that automatically manages local variables and function call data, growing and shrinking as functions are called and return, and it is fast but limited in size. The heap is a region for dynamically allocated memory, managed manually with functions like `malloc` and `free`, offering more flexibility in size and lifetime at the cost of more responsibility. Choosing between them depends on whether the data's size is known at compile time and how long it needs to live.

Visit the following resources to learn more:

- [@article@Stack and Heap](https://medium.com/@beingnile/stack-and-heap-25ada76c1b61)
- [@article@What are Stack and Heap Memory?](https://www.youtube.com/watch?v=ep2xOW52mDY)
- [@video@How to Implement a Stack in C With Code Examples](https://www.digitalocean.com/community/tutorials/stack-in-c)