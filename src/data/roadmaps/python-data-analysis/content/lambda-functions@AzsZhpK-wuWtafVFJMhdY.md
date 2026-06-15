# Lambda Functions
 
Lambda functions are anonymous, single-expression functions defined with the `lambda` keyword. They are used for short, throwaway operations, particularly as arguments to functions like `map()`, `filter()`, and Pandas' `apply()`. For example: `df['col'].apply(lambda x: x * 2)`.