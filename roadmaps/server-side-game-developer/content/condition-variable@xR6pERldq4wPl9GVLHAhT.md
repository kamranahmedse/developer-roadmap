# Condition Variable

A `condition variable` is an object that has the ability to block the calling thread until notified to resume. It's used in conjunction with a `mutex` (or `lock`) in the synchronization of threads. A condition variable is made up of a mutex (or lock) and a waiting queue. Typically, a condition variable is used when a thread needs to wait until a certain condition is met. The thread will lock the mutex, check the condition, and if the condition isn't met, it will enter the waiting queue and unlock the mutex. When the condition is met, another thread will notify the condition variable, prompt it to wake up a thread from the waiting queue, and relock the mutex. It's important to mention that condition variables are subject to spurious wakeups and lost wakeups, hence developers need to manage them carefully.
Visit the following resources to learn more:

- [@official@Using Condition Variables - IBM](https://www.ibm.com/docs/ssw_aix_71/com.ibm.aix.genprogc/condition_variables.htm)
- [@article@Condition Variables – ModernesC++](https://www.modernescpp.com/index.php/condition-variables/)
- [@official@std::condition\_variable - cppreference](https://en.cppreference.com/cpp/thread/condition_variable)
