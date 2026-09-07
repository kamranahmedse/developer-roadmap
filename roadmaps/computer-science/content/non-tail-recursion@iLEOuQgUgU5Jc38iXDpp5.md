# Non-Tail Recursion
 
Non-tail recursion is a form of recursion where work remains to be done after the recursive call returns, such as combining the result with something else. Each call must keep its stack frame until the recursive call underneath it finishes, which means the call stack grows with each level of recursion and cannot be optimized away like tail recursion.

Visit the following resources to learn more:

- [@article@What is non-tail recursion?](https://www.quora.com/What-is-non-tail-recursion)
- [@article@Tail vs Non-Tail Recursion](https://www.baeldung.com/cs/tail-vs-non-tail-recursion)
- [@video@Recursion (Solved Problem 1)](https://www.youtube.com/watch?v=IVLUGb_gDDE)
- [@video@Types of Recursion (Part 2) | Tail & Non-tail Recursion](https://www.youtube.com/watch?v=HIt_GPuD7wk)