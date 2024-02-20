# Common Runtimes

Common runtimes are used to quantify the performance of an algorithm as the size of the input data increases. They are usually expressed in Big O notation such as:

- **O(1)**: Constant time complexity, the algorithm will always execute in the same time regardless of the size of the input data set.
- **O(N)**: Linear time complexity, the running time increases linearly with the size of the input data.
- **O(log N)**: Logarithmic time complexity, the running time increases logarithmically with the size of the input data set.
- **O(N log N)**: Quasilinear time complexity, slightly worse than linear but better than polynomial.
- **O(N^2)**: Quadratic time complexity, the running time increases quadratically with the size of the input data.
- **O(N^3)**: Cubic time complexity, the running time increases cubically with the size of the input.
- **O(2^N)**, **O(N!)**: Exponential and factorial time complexities respectively, the running time grows very quickly with the size of the input.
  
Each of these represent different classes of algorithms and the increase in their running time as the size of input increases. Algorithms with lesser time complexity are generally preferred as they scale better with larger input sizes.