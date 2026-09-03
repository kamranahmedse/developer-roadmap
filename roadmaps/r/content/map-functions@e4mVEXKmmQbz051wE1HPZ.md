# Map Functions

Map functions apply a function to every element of a list or vector and collect the results, avoiding the need for an explicit loop. purrr's `map()` always returns a list, while variants like `map_dbl()` return a vector of a specific type, making the expected output explicit. This becomes especially useful for iterating over nested data, such as running the same model on many subsets of a dataset at once.

Visit the following resources to learn more:

- [@article@Mastering the map() Function in R: A Comprehensive Guide](https://www.r-bloggers.com/2024/03/mastering-the-map-function-in-r-a-comprehensive-guide/)
- [@article@Functionals in R](https://adv-r.hadley.nz/functionals.html)
- [@video@Alternative to for loops in R with purrr's map, map_dbl, and map_dfr functions (CC043)](https://www.youtube.com/watch?v=nXQDiCTLTgU)