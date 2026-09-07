# Apply Family

The apply family is a set of base R functions that apply another function to every element of a vector, list, or data structure, replacing many uses of explicit loops. `lapply()` always returns a list, `sapply()` tries to simplify the result into a vector or matrix, and `vapply()` works like `sapply()` but requires specifying the expected output type in advance. These functions predate the tidyverse's purrr package, which offers similar functionality with more consistent behavior.

Visit the following resources to learn more:

- [@article@apply family in r apply(), lapply(), sapply(), mapply() and tapply()](https://www.r-bloggers.com/2021/05/apply-family-in-r-apply-lapply-sapply-mapply-and-tapply/)
- [@article@apply, lapply, sapply in R: The apply Family Explained](https://coddy.tech/docs/r/apply-family)
- [@video@Apply Functions in R](https://www.youtube.com/watch?v=i8xYAX5dH-o)