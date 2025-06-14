# Soft and Hard Links

Linux supports two types of file links. Hard links share the same inode and data as the original file - if the original is deleted, data remains accessible. Soft links (symbolic links) are shortcuts pointing to the original file path - they break if the original is removed. Create with `ln` for hard links and `ln -s` for soft links.

Below is an example of how to create a soft link and a hard link in Linux:

```bash
# Create a hard link
ln source_file.txt hard_link.txt

# Create a soft link
ln -s source_file.txt soft_link.txt
```

Please, understand that `source_file.txt` is the original file and `hard_link.txt` & `soft_link.txt` are the hard and soft links respectively.

Learn more from the following resources:

- [@article@How to understand the difference between hard and symbolic links in Linux](https://labex.io/tutorials/linux-how-to-understand-the-difference-between-hard-and-symbolic-links-in-linux-409929)
