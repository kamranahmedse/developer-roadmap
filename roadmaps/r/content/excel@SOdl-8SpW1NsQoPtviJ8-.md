# Excel

Excel files store data in a binary or XML-based format that differs from plain text files, often including multiple sheets and formatting within a single file. R doesn't read them with base functions, so packages like readxl are needed to extract the underlying data into a usable data frame. Reading Excel data means deciding which sheet to read and whether the first row contains headers.