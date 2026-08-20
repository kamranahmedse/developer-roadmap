# isnull, isna
 
Detecting missing values in R relies on `is.na()`, since direct comparison like `NA == NA` doesn't return `TRUE` the way you might expect. This function returns a logical vector marking which values are missing, which can then be summed to count them or used to filter rows. It's the starting point before deciding how to handle any missing data found.