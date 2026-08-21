# Pipe

The pipe operator takes the result on its left and passes it as the first argument to the function on its right, letting you chain several operations in a readable, top-to-bottom sequence. R now has two common versions: the native pipe `|>`, built into base R since version 4.1, and the older magrittr pipe `%>%`, which predates it and is still common in existing code. Writing `data |> filter(x > 0) |> summarize(mean(x))` reads as a sequence of steps rather than a nested jumble of function calls.

Visit the following resources to learn more:

- [@article@R Pipe Operator: %\>% vs |\>, The Complete Guide to Both Pipes](https://r-statistics.co/R-Pipe-Operator.html)
- [@video@Finally Explained: The Difference Between R's Pipe Operators](https://www.youtube.com/watch?v=uIL9gMjn40Y)
- [@video@Introducing the Pipe Operator in R](https://www.youtube.com/watch?v=Stt3qEuIeso)