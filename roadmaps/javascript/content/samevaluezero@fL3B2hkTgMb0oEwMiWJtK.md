# SameValueZero
 
SameValueZero is an equality algorithm used internally by JavaScript in methods like `Array.prototype.includes()` and `Map` key comparison. It behaves like `===` but treats `NaN` as equal to itself. Unlike `SameValue`, it considers `+0` and `-0` as equal.

Visit the following resources to learn more:

- [@article@Same-value-zero equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality)