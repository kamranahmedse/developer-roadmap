# LMOVE

`LMOVE` is a Redis command used to atomically move an element from one list to another. It pops an element from the source list (either from the left or right end) and pushes it to the destination list (either to the left or right end), based on the specified parameters (`LEFT` or `RIGHT`). This command is useful for implementing queue-like patterns or managing work distribution between different lists without race conditions, as it ensures that the element is safely transferred in a single atomic operation.

Learn more from the following resources:

