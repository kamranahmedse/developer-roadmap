# isnull, isna

Detecting missing values in R relies on `is.na()`, since direct comparison like `NA == NA` doesn't return `TRUE` the way you might expect. This function returns a logical vector marking which values are missing, which can then be summed to count them or used to filter rows. It's the starting point before deciding how to handle any missing data found.

Visit the following resources to learn more:

- [@article@Missing values](https://r4ds.hadley.nz/missing-values.html)
- [@article@R null values: NULL, NA, NaN, Inf](https://www.r-bloggers.com/2018/07/r-null-values-null-na-nan-inf/)
- [@video@Handling NA in R | is.na, na.omit & na.rm Functions for Missing Values](https://www.youtube.com/watch?v=q8eR2suCyGk)