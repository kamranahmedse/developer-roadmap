# Thread in OS

`Thread` is an active entity which executes a **part of a process**. It is a sequential flow of tasks within a process. It is also called lightweight process as they **share common resources**. A process can contain multiple threads. Threads are used to increase the performance of the applications.
Each thread has its own program counter, stack, and set of registers. But the threads of a single process might share the same code and data/file.

**Key Terminologies:**
* `proc`
* `fork`
* `join`

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Pre-Requesite' href='https://www.geeksforgeeks.org/introduction-of-process-synchronization/'>Process Synchronization</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/thread-in-operating-system/'>What is Thread in OS?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.scaler.com/topics/operating-system/threads-in-operating-system/'>Process vs Thread & Multi-Threading</BadgeLink>

# Concurrency in OS

`Concurrency` is the execution of the multiple instruction sequences at the same time. It happens in the operating system when there are several process threads running in parallel. It helps in techniques like **coordinating execution of processes**, memory allocation and execution scheduling for maximizing throughput. 

The running process threads always communicate with each other through shared memory or message passing. Concurrency results in sharing of resources result in problems like deadlocks and resources starvation.

**Key Terminologies:**
* mutex
* critical section
* Deadlock

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/concurrency-in-operating-system/'>What Concurrency in OS?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/@azizomarck/how-is-concurrency-different-from-parallelism-334b6d5c869a'>Threads vs Concurrency</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/@akhandmishra/operating-system-threads-and-concurrency-aec2036b90f8'>How Concurrency is achieved in Threads</BadgeLink>