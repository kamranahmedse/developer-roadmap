# Soft and Hard Links in Linux

In Linux, soft (symbolic) and hard links are references to existing files that allow users to create shortcuts and duplicates within the file system.

A **hard link** is a direct reference to the original file, sharing the same file data and inode number, but with a different name. If the original file is deleted, the hard link still retains the file data.

On the other hand, a **soft link**, also known as a symbolic link, is a shortcut to the original file. It has a different inode number, and the file data resides only in the original file. If the original file is removed, the symbolic link becomes broken and will not work until the original file is restored.

Here's an example of how to create a soft link and a hard link in Ubuntu Linux:

```bash
# Create a hard link
ln /roadmap/source_file.txt /roadmap/hard_link.txt

# Create a soft link
ln -s /roadmap/source_file.txt /roadmap/soft_link.txt
```

In this example, `/roadmap/source_file.txt` is the original file, `/roadmap/hard_link.txt` is the hard link, and `/roadmap/soft_link.txt` is the soft link.
