# Fiber

`Fiber` is a way to manage concurrency at a more granular level than threads. While threads represent a sequence of instructions that can run concurrently with other threads, a fiber is a unit of execution which only runs on its initiating thread. Fibers are scheduled by the application, not the operating system. They are great tools for implementing co-operative multitasking where you have many tasks that you want to have run concurrently, but you want to have explicit control on when they are switched in and out. For server-side game development, fibres can be particularly useful in dealing with multiple user requests, where each request might have its own fiber.
Visit the following resources to learn more:

- [@article@Green Thread - Wikipedia](https://en.wikipedia.org/wiki/Green_thread)
- [@article@Introduction to ZIO Fibers - ZIO](https://zio.dev/reference/fiber/)
- [@article@Difference Between Fibers and Threads - Cbrix](https://www.cbrix.com/difference-between-fibers-and-threads-a-comprehensive-guide/)
