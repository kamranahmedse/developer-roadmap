# Factorial

Factorial complexity algorithms have a runtime of `O(n!)`. This is the worst case scenario for an algorithm. Factorial complexity algorithms are very inefficient and should be avoided.

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
```
