# Volatile Keyword

The `volatile` keyword in Java is a modifier that can be applied to instance variables. It ensures that all threads see the most up-to-date value of a variable. Without `volatile`, each thread might cache its own copy of the variable, leading to inconsistencies when multiple threads access and modify it concurrently. Using `volatile` forces the thread to read the variable's value directly from main memory, and write changes directly back to main memory, bypassing the thread's local cache.

Visit the following resources to learn more:

- [@article@Java Volatile Keyword](https://jenkov.com/tutorials/java-concurrency/volatile.html)
- [@article@Guide to the Volatile Keyword in Java](https://www.baeldung.com/java-volatile)
