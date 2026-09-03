# Dropping vs. Imputing

Once missing values are found, you have to decide whether to drop rows containing them, which is simple but can lose real information, or impute them, replacing missing values with an estimate like the column mean. The right choice depends heavily on why the data is missing and how much of it there is. Dropping too aggressively can bias results if the missingness isn't random.

Visit the following resources to learn more:

- [@article@Missing values](https://r4ds.hadley.nz/missing-values.html)
- [@article@A Complete Guide to Handling Missing Values in R: Concepts, Pitfalls, and Practical Imputation with mice](https://dev.to/dipti_moryani_08e62702314/a-complete-guide-to-handling-missing-values-in-r-concepts-pitfalls-and-practical-imputation-with-3b7l)
- [@video@Handling Missing Data and Missing Values in R Programming](https://www.youtube.com/watch?v=kIKg5s_jDAk)