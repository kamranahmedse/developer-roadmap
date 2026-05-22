# Task-Based

Task-based multithreading refers to a model where tasks are the units of work abstracted from threads. In this model, application logic is divided into smaller tasks, each capable of running independent of the others. The tasks are then executed by a pool of threads, managed by a scheduler. Unlike traditional thread-centric models where each thread performs a specific task, task-based multithreading allows for greater flexibility by decoupling the tasks from the threads and letting the system dynamically assign tasks to idle threads. With task-based multithreading, developers no longer need to manually manage threading details like creation, control, synchronization, and termination, hence enabling more focus on the development of the game logic.
Visit the following resources to learn more:

- [@article@Implementations of Task-Based Parallelism in Game Engines - StackExchange](https://gamedev.stackexchange.com/questions/60240/implementations-of-task-based-parallelism-in-game-engines)
- [@article@Task-based Multithreading: How to Program for 100 Cores - GDC Vault](https://gdcvault.com/play/1012321/Task-based-Multithreading-How-to)
- [@article@Getting Started with Intel oneAPI Tasking Library - Intel](https://www.intel.com/content/www/us/en/developer/articles/guide/get-started-with-intel-oneapi-tasking-library.html)
