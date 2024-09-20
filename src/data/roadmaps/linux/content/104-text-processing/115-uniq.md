# Uniq

In Linux, `uniq` is an extremely useful command-line program for text processing. It aids in the examination and manipulation of text files by comparing or filtering out repeated lines that are adjacent. Whether you're dealing with a list of data or a large text document, the `uniq` command allows you to find and filter out duplicate lines, or even provide a count of each unique line in a file. It's important to remember that `uniq` only removes duplicates that are next to each other, so to get the most out of this command, data is often sorted using the `sort` command first.

An example of using `uniq` would be:

```bash
sort names.txt | uniq
```

In this example, `names.txt` is a file containing a list of names. The `sort` command sorts all the lines in the file, and then the `uniq` command removes all the duplicate lines. The resulting output would be a list of unique names from `names.txt`.

Learn more from the following resources:

- [@article@Linux uniq Command: Duplicate Filtering](https://labex.io/tutorials/linux-linux-uniq-command-duplicate-filtering-219199)