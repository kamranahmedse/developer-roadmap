# Scheduling Algorithms

CPU Scheduling is the process of selecting a process from the ready queue and allocating the CPU to it. The selection of a process is based on a particular scheduling algorithm. The scheduling algorithm is chosen depending on the type of system and the requirements of the processes.

Here is the list of some of the most commonly used scheduling algorithms:

- **First Come First Serve (FCFS):** The process that arrives first is allocated the CPU first. It is a non-preemptive algorithm.
- **Shortest Job First (SJF):** The process with the smallest execution time is allocated the CPU first. It is a non-preemptive algorithm.
- **Shortest Remaining Time First (SRTF):** The process with the smallest remaining execution time is allocated the CPU first. It is a preemptive algorithm.
- **Round Robin (RR):** The process is allocated the CPU for a fixed time slice. The time slice is usually 10 milliseconds. It is a preemptive algorithm.
- **Priority Scheduling:** The process with the highest priority is allocated the CPU first. It is a preemptive algorithm.
- **Multi-level Queue Scheduling:** The processes are divided into different queues based on their priority. The process with the highest priority is allocated the CPU first. It is a preemptive algorithm.
- **Multi-level Feedback Queue Scheduling:** The processes are divided into different queues based on their priority. The process with the highest priority is allocated the CPU first. If a process is preempted, it is moved to the next queue. It is a preemptive algorithm.
- **Highest Response Ratio Next(HRRN):** CPU is allotted to the next process which has the highest response ratio and not to the process having less burst time. It is a Non-Preemptive algorithm.
- **Lottery Scheduling:** The process is allocated the CPU based on a lottery system. It is a preemptive algorithm.

Visit the following resources to learn more : 
- [@video@ Introduction to CPU Scheduling](https://youtu.be/EWkQl0n0w5M?si=Lb-PxN_t-rDfn4JL)
- [@article@ CPU Scheduling in Operating Systems - geeksforgeeks](https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/)
- [@article@ Lottery Scheduling for Operating Systems - geeksforgeeks](https://www.geeksforgeeks.org/lottery-process-scheduling-in-operating-system/)
- [@article@ Program for Round Robin Scheduling for the same Arrival time - geeksforgeeks](https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-the-same-arrival-time/)
