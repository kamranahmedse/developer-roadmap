# Ring Buffers / FIFO Queues

A ring buffer, or circular buffer, is a fixed-size buffer that wraps around to the beginning once it reaches the end, making it efficient for implementing first-in-first-out queues without shifting elements. It tracks a read position and a write position that both wrap around the buffer's length. Ring buffers are common in embedded systems and streaming applications where data arrives continuously and memory needs to stay bounded.

Visit the following resources to learn more:

- [@article@Creating a Circular Buffer in C and C++](https://embeddedartistry.com/blog/2017/05/17/creating-a-circular-buffer-in-c-and-c/)
- [@video@Circular Buffer | Circular Buffer Implementation in C](https://www.youtube.com/watch?v=uvD9_Wdtjtw)