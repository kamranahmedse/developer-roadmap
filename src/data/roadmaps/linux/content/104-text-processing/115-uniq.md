# Uniq

The `uniq` command is a powerful tool in the Linux command-line arsenal for filtering out duplicate lines from text data. Whether you're working with a list of names, log files, or any other type of text-based data, `uniq` can help you identify and remove redundant lines, making your data more concise and easier to work with.

## How `uniq` Works

The `uniq` command compares adjacent lines in a file and removes any duplicates. It's important to note that `uniq` only removes duplicates that are next to each other, so it's often used in conjunction with the `sort` command to ensure that all duplicates are grouped together before being filtered out.

Here's an example of using `uniq` on a file called `names.txt` on a Ubuntu Linux system:

```bash
$ cat names.txt
John
Jane
John
Alice
Bob
Bob
```

To remove the duplicate lines, we can use the following command:

```bash
$ sort names.txt | uniq
Alice
Bob
Jane
John
```

In this example, the `sort` command first arranges the lines in alphabetical order, and then `uniq` removes the adjacent duplicates, leaving us with a list of unique names.

## Additional `uniq` Options

The `uniq` command offers several additional options that can be useful in different scenarios:

- `-c`: Counts the number of occurrences of each unique line.
- `-d`: Displays only the duplicate lines.
- `-u`: Displays only the unique lines.

For example, to count the number of occurrences of each unique line in the `names.txt` file:

```bash
$ sort names.txt | uniq -c
   1 Alice
   2 Bob
   1 Jane
   2 John
```

This output shows that "Alice" and "Jane" each appear once, while "Bob" and "John" each appear twice.

Learn more from the following resources:

- [@article@Linux uniq Command: Duplicate Filtering](https://labex.io/tutorials/linux-linux-uniq-command-duplicate-filtering-219199)
