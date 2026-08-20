# Working with Data Tables
 
Working with data tables means using the data.table package's syntax and conventions for fast, memory-efficient data manipulation on large datasets. It uses a distinctive bracket-based syntax, `dt[i, j, by]`, differing from both base R indexing and dplyr's verb-based approach. It's typically reached for once dataset size makes dplyr noticeably slower.