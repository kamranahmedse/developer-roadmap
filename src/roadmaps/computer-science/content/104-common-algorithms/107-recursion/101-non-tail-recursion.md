# Non-tail recursion

Tail recursion is when a function can directly return the result of a recursive call - there are no outstanding operations, and there is no need for the call stack frame to be preserved. So it can be translated to a “goto with arguments”, and the stack usage will be constant.

In “non-tail recursion”, there are outstanding operations after the recursive call, and the stack frame cannot be nuked.

- [What is non-tail recursion?](https://www.quora.com/What-is-non-tail-recursion)
- [Tail vs Non-Tail Recursion](https://www.baeldung.com/cs/tail-vs-non-tail-recursion)
- [Recursion (Solved Problem 1)](https://www.youtube.com/watch?v=IVLUGb_gDDE)
- [Types of Recursion (Part 2) | Tail & Non-tail Recursion](https://www.youtube.com/watch?v=HIt_GPuD7wk)
