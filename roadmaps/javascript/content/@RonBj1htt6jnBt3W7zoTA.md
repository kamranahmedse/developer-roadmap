# ==
 
The `==` operator compares two values for equality after performing type coercion if the types differ. For example, `"5" == 5` returns `true` because the string is converted to a number before comparison. This can produce surprising results and is generally avoided in favor of `===`.

Visit the following resources to learn more:

- [@article@Equality comparisons and sameness - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value_equality_using_object.is)