# Thread in OS

`Thread` is an active entity which executes a **part of a process**. It is a sequential flow of tasks within a process. It is also called lightweight process as they **share common resources**. A process can contain multiple threads. Threads are used to increase the performance of the applications.
Each thread has its own program counter, stack, and set of registers. But the threads of a single process might share the same code and data/file.

**Key Terminologies:**
* `proc`
* `fork`
* `join`

{% resources %}
  {% Blog "https://www.geeksforgeeks.org/introduction-of-process-synchronization/", "Process Synchronization" %}
  {% Blog "https://www.geeksforgeeks.org/thread-in-operating-system/", "What is Thread in OS?" %}
  {% Blog "https://www.scaler.com/topics/operating-system/threads-in-operating-system/", "Process vs Thread & Multi-Threading" %}
  {% Blog "https://www.geeksforgeeks.org/concurrency-in-operating-system/", "What Concurrency in OS?" %}
  {% Blog "https://medium.com/@azizomarck/how-is-concurrency-different-from-parallelism-334b6d5c869a", "Threads vs Concurrency" %}
  {% Blog "https://medium.com/@akhandmishra/operating-system-threads-and-concurrency-aec2036b90f8", "How Concurrency is achieved in Threads" %}
{% endresources %}