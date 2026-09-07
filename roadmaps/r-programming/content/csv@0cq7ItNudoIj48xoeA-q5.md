# CSV

CSV files store tabular data as plain text with values separated by commas, making them one of the most universal formats for exchanging data between tools. Base R can read them with `read.csv()`, though readr's `read_csv()` is faster and handles more edge cases well, such as inconsistent column types or unusual encodings. Reading them correctly means paying attention to details like headers and how missing values are represented.

Visit the following resources to learn more:

- [@article@Reading a CSV file in R](https://www.sfu.ca/~mjbrydon/tutorials/BAinR/data.html#reading-a-csv-file)
- [@article@How to Import CSV Files into R?](https://www.r-bloggers.com/2022/01/how-to-import-csv-files-into-r/)
- [@video@Importing a .csv file to R Studio using the read.csv function](https://www.youtube.com/watch?v=oRaPjJefoTo)