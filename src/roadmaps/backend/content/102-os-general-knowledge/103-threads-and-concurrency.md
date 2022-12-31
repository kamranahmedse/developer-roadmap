# Threads and Concurrency

A thread is the smallest unit of processing that can be performed in an OS. In most modern operating systems, a thread exists within a process - that is, a single process may contain multiple threads.

Concurrency refers to the execution of multiple threads at the same time. It occurs in an operating system when multiple process threads are executing concurrently. These threads can interact with one another via shared memory or message passing. Concurrency results in resource sharing, which causes issues like deadlocks and resource scarcity. It aids with techniques such as process coordination, memory allocation, and execution schedule to maximize throughput.

{% resources %}
  {% Blog "https://www.backblaze.com/blog/whats-the-diff-programs-processes-and-threads/", "What’s the Diff: Programs, Processes and Threads" %}
  {% Blog "https://www.javatpoint.com/concurrency-in-operating-system", "Concurrency in Operating System" %}
  {% Blog "https://www.youtube.com/watch?v=exbKr6fnoUw", "Intro to Processes & Threads" %}
  {% Blog "https://www.youtube.com/watch?v=iKtvNJQoCNw", "Introduction to Concurrency" %}
  {% Blog "https://www.youtube.com/watch?v=olYdb0DdGtM", "Concurrency, Threading and Parallelism Explained" %}
{% endresources %}