# Fibers

Fibers are a lightweight concurrency construct that allows you to create code blocks that can be paused and resumed. They provide a way to implement cooperative multitasking within a single thread, enabling you to manage multiple tasks without the overhead of creating and managing multiple threads or processes. Fibers are useful for scenarios where you need fine-grained control over the execution flow and want to avoid the complexities of thread synchronization.

Visit the following resources to learn more:

- [@book@Magesh, "Concurrency in Ruby: Threads, Fibers, and Ractors Demystified"](https://www.youtube.com/watch?v=LVHiq_SbQOE)
- [@official@class Fiber](https://docs.ruby-lang.org/en/master/Fiber.html)
- [@article@How to use Ruby Fibers for Background Jobs](https://medium.com/@alieckaja/unleashing-the-power-of-fibers-for-background-jobs-8a22e3a38cd1)
- [@article@Ruby Fibers 101](https://blog.saeloun.com/2022/03/01/ruby-fibers-101/)