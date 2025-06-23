# Soft and Hard Links

Linux supports two types of file links. Hard links share the same inode and data as the original file - if the original is deleted, data remains accessible. Soft links (symbolic links) are shortcuts pointing to the original file path - they break if the original is removed. Create with `ln` for hard links and `ln -s` for soft links.

Visit the following resources to learn more:

- [@article@Hard links and Soft links in Linux Explained](https://www.redhat.com/en/blog/linking-linux-explained)
- [@article@Difference between hard link and soft link](https://kerneltalks.com/commands/difference-between-hard-link-and-soft-link/)
- [@article@How to Understand the Difference between Hard and Symbolic Links in Linux](https://labex.io/tutorials/linux-how-to-understand-the-difference-between-hard-and-symbolic-links-in-linux-409929)
