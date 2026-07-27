# SameValue
 
SameValue is the equality algorithm used by `Object.is()`. It is the strictest equality comparison in JavaScript: it returns `true` only when two values are identical, treating `NaN` as equal to `NaN` and `+0` as not equal to `-0`. It is used in a few specific internal operations.

Visit the following resources to learn more:

- [@article@Same-value equality using Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value_equality_using_object.is)