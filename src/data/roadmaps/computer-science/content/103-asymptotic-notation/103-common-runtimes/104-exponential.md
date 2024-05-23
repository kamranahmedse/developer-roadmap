# Exponential

Exponential algorithms are those that grow at a rate of 2^n. This means that for each additional input, the algorithm will take twice as long to run. The following function is an example of an exponential algorithm:

```python
def generate_permutations(s):
    # Base case: If the string length is 1, return a list containing the string
    if len(s) == 1:
        return [s]
    
    # Initialize the result list
    permutations = []
    
    # Recursively generate all permutations
    for i in range(len(s)):
        # Current character
        current_char = s[i]
        # Remaining characters
        remaining_chars = s[:i] + s[i+1:]
        # Generate all permutations of the remaining characters
        for perm in generate_permutations(remaining_chars):
            # Add the current character to the front of each generated permutation
            permutations.append(current_char + perm)
    
    return permutations
```

As you can see, the algorithm's runtime grows exponentially. For each additional input, the algorithm will take twice as long to run.

Visit the following resources to learn more:

- [Big O Notation — Calculating Time Complexity](https://www.youtube.com/watch?v=Z0bH0cMY0E8)
- [Big O Notations](https://www.youtube.com/watch?v=V6mKVRU1evU)
