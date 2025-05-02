# Factorial

Factorial complexity algorithms have a runtime of `O(n!)`. This is the worst case scenario for an algorithm. Factorial complexity algorithms are very inefficient and should be avoided.

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
        remaining_chars = s[:i] + s[i + 1 :]
        # Generate all permutations of the remaining characters
        for perm in generate_permutations(remaining_chars):
            # Add the current character to the front of each generated permutation
            permutations.append(current_char + perm)

    return permutations
```

Visit the following resources to learn more:

- [@article@Big O Cheat Sheet - Time Complexity Chart](https://www.freecodecamp.org/news/big-o-cheat-sheet-time-complexity-chart/)
- [@video@Factorial Explained](https://www.youtube.com/watch?v=pxh__ugRKz8)
