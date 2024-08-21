# Binary Search

Binary search is a type of search algorithm that follows the **divide and conquer** strategy in **sorted arrays** by **dividing the search interval in half** after each repetition.

Initially, the search space is the entire array and the target is compared with the middle element of the array. If they are not equal, now the search space is the half of the array in which the element could be located (the first half if the target is smaller than the previously compared element and the other half in the opposite case) and repeat: take the middle element (of that half) to compare to the target, and repeating this until the target is found. If the search ends with the remaining half being empty, the target is not in the array.

Binary search is **log(n)** as it cuts down the search space by half each step.
