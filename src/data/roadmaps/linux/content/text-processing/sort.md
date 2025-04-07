# Sort

Linux provides a variety of tools for processing and manipulating text files, one of which is the sort command. The `sort` command in Linux is used to sort the contents of a text file, line by line. The command uses ASCII values to sort files. You can use this command to sort the data in a file in a number of different ways such as alphabetically, numerically, reverse order, or even monthly. The sort command takes a file as input and prints the sorted content on the standard output (screen).

Here is a basic usage of the `sort` command:

```bash
sort filename.txt
```

This command prints the sorted content of the filename.txt file. The original file content remains unchanged. In order to save the sorted contents back into the file, you can use redirection:

```bash
sort filename.txt > sorted_filename.txt
```

This command sorts the content of filename.txt and redirects the sorted content into sorted_filename.txt.

Learn more from the following resources:

- [@article@Linux sort Command: Text Sorting](https://labex.io/tutorials/linux-linux-sort-command-text-sorting-219196)