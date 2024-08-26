# Lock / Mutex / Semaphore

A lock allows only one thread to enter the part that's locked and the lock is not shared with any other processes.

A mutex is the same as a lock but it can be system wide (shared by multiple processes).

A semaphore does the same as a mutex but allows x number of threads to enter, this can be used for example to limit the number of cpu, io or ram intensive tasks running at the same time.

Visit the following resources to learn more:

- [@article@What is the difference between lock, mutex and semaphore?](https://stackoverflow.com/questions/2332765/what-is-the-difference-between-lock-mutex-and-semaphore)
- [@article@What is a Semaphore](https://stackoverflow.com/questions/34519/what-is-a-semaphore/40238#40238)
