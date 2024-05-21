# Exponential

Exponential time complexity is denoted as `O(2^n)`, where a growth in `n` leads to an exponential growth in the number of steps required to complete a task. It means that the time complexity will double with every additional element in the input set. This is seen in many recursive algorithms, where a problem is divided into two sub-problems of the same type. Examples of such algorithms include the naive recursive approach for the Fibonacci sequence or the Towers of Hanoi problem. Although exponential time complexity solutions are often simpler to implement, they are inefficient for larger input sizes.

The following function is an example of an exponential algorithm:
```python
def exponential(n):
    if n == 0:
        return 1
    return 2 * exponential(n - 1)
```

As you can see, the algorithm's runtime grows exponentially. For each additional input, the algorithm will take twice as long to run.

Visit the following resources to learn more:

- [Big O Notation — Calculating Time Complexity](https://www.youtube.com/watch?v=Z0bH0cMY0E8)
- [Big O Notations](https://www.youtube.com/watch?v=V6mKVRU1evU)
