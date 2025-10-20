# Exponential

Exponential algorithms are those that grow at a rate of 2^n. This means that for each additional input, the algorithm will take twice as long to run. The following function is an example of an exponential algorithm:

    def exponential(n):
        if n == 0:
            return 1
        return exponential(n - 1) + exponential(n - 1)
    

As you can see, the algorithm's runtime grows exponentially. For each additional input, the algorithm will take twice as long to run.

Visit the following resources to learn more:

- [@video@Big O Notation — Calculating Time Complexity](https://www.youtube.com/watch?v=Z0bH0cMY0E8)
- [@video@Big O Notations](https://www.youtube.com/watch?v=V6mKVRU1evU)