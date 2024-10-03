# Sort Command in Text Processing

Linux provides a powerful tool called `sort` for processing and manipulating text files. The `sort` command is used to sort the contents of a text file, line by line, based on ASCII values. This command allows you to sort data in various ways, such as alphabetically, numerically, in reverse order, or even by date.

Here's how you can use the `sort` command in Ubuntu Linux:

## Basic Usage

To sort the contents of a file, simply run the following command:

```bash
sort filename.txt
```

This will print the sorted content to the standard output (screen). The original file remains unchanged.

## Saving the Sorted Output

If you want to save the sorted contents to a new file, you can use redirection:

```bash
sort filename.txt > sorted_filename.txt
```

This will create a new file called `sorted_filename.txt` with the sorted contents.

## Sorting Options

The `sort` command offers various options to customize the sorting process:

- `-r`: Sort in reverse order
- `-n`: Sort numerically
- `-k <field>`: Sort by a specific field (column)
- `-t <delimiter>`: Use a custom delimiter (instead of whitespace)
- `-m`: Merge already sorted files

For example, to sort a file numerically in reverse order:

```bash
sort -nr filename.txt
```

To learn more about the `sort` command and its advanced features, check out the following resources:

- [@article@Linux sort Command: Text Sorting](https://labex.io/tutorials/linux-linux-sort-command-text-sorting-219196)
