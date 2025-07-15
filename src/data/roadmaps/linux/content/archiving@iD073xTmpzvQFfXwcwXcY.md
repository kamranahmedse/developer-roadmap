# Archiving

Linux offers powerful utilities for archiving, where multiple files and directories are combined into a single file, primarily for backup and simplification of distribution. The main tools used for this purpose are `tar`, `gzip`, and `bzip2`.

The `tar` command, originally for tape archiving, is a versatile tool that can manage and organize files into one archive. Meanwhile, `gzip` and `bzip2` are used for file compression, reducing the file size and making data transmission easier.

Take a look at the following commands in use:

```bash
# To create a tar archive:
tar cvf archive_name.tar directory_to_archive/

# To extract a tar archive:
tar xvf archive_name.tar

# To create a gzip compressed tar archive:
tar cvzf archive_name.tar.gz directory_to_archive/

#To create a bzip2 compressed tar archive:
tar cvjf archive_name.tar.bz2 directory_to_archive/
```

Remember, in Linux, archiving and compression are separate processes, hence `tar` to archive and `gzip`/`bzip2` to compress. Although they're commonly used together, they can very much be used separately as per the requirements.

Learn more from the following resources:

- [@article@Linux File Packaging and Compression](https://labex.io/tutorials/linux-file-packaging-and-compression-385413)