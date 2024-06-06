# Value Comparison Operators

In javascript, the `==` operator does the type conversion of the operands before comparison, whereas the `===` operator compares the values and the data types of the operands. The `Object.is()` method determines whether two values are the same value: `Object.is(value1, value2)`.

`Object.is()` is not equivalent to the `==` operator. The `==` operator applies various coercions to both sides (if they are not the same type) before testing for equality (resulting in such behavior as `"" == false` being `true`), but `Object.is()` doesn't coerce either value.

`Object.is()` is also not equivalent to the `===` operator. The only difference between `Object.is()` and `===` is in their treatment of signed zeros and `NaN` values. The `===` operator (and the `==` operator) treats the number values `-0` and `+0` as equal but treats `NaN` as not equal to each other.

Visit the following resources to learn more:

- [@article@Equality comparisons and sameness - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value_equality_using_object.is)
