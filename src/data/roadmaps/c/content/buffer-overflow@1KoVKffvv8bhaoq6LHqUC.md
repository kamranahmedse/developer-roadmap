# Buffer Overflow

A buffer overflow occurs when a program writes more data into a fixed-size buffer, like an array, than it can hold, overwriting adjacent memory. This can corrupt other variables, crash the program, or in more severe cases be exploited to execute malicious code, making it a well-known security vulnerability. Using safer alternatives to functions like `strcpy`, such as `strncpy` or `snprintf` with explicit size limits, helps prevent it.

Visit the following resources to learn more:

- [@article@Buffer Overflow Exploit in C. A brief overview with a hands on lab.](https://medium.com/@brendamejia/buffer-overflow-exploit-in-c-a-brief-overview-with-a-hands-on-lab-60e53d0d8d08)
- [@video@C Buffer Overflow, Heap/Stack Corruption and Analysis](https://www.youtube.com/watch?v=CQ6pGrXY1Us)
- [@video@Running a Buffer Overflow Attack](https://www.youtube.com/watch?v=1S0aBV-Waeo)