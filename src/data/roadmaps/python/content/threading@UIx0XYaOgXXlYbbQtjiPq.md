# Threading

Multithreading allows multiple threads within a single process. However, because of GIL, threads cannot run in parallel on different cores, which makes multithreading suitable for I/O tasks (e.g., network requests) but not for computational tasks.

Learn more from the following resources:

- [@official@Python Threading Library](https://docs.python.org/3/library/threading.html)
- [@article@Introduction to Threading in Python](https://realpython.com/intro-to-python-threading/)
