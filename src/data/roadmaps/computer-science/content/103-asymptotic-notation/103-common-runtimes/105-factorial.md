# Factorial

Factorial complexity algorithms have a runtime of `O(n!)`. This is the worst case scenario for an algorithm. Factorial complexity algorithms are very inefficient and should be avoided.

```python
def factorial(n):
    if n == 1:
        return 1
    sum=0
    for i in range(n):
        sum = sum + factorial(n-1)
    return sum
```
