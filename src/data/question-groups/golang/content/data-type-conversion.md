In Go, you have to explicitly convert types, meaning that you have to explicitly cast one type into the other, there is no implicit or default behavior when assigning values to variables of a different type (i.e assigning an int value to a boolean variable). 

Specifically for numeric value conversions, you simply cast using the target type (for example, float64(intValue)). 

Some pitfalls of this process might include losing precision or encountering overflow. It's important to ensure that data types match (can be translated into each other) to prevent errors during conversion. 