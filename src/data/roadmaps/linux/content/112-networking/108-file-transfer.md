# Linux File Transfer over Networks

In the Linux operating system, file transfer refers to the process of copying or moving files from one computer to another over a network connection. This capability is essential for system administrators and end-users who need to share files between systems or networks.

Linux offers several command-line tools and applications for network-based file transfers, supporting various standard protocols such as FTP, HTTP, SCP, SFTP, and NFS. Some of the most commonly used commands for file transfer include `scp`, `rsync`, and `wget`.

For example, to transfer a file from a local machine to a remote server using the `scp` (Secure Copy) command on Ubuntu Linux, you can run the following command:

```bash
scp /path/to/local/file roadmap@example.com:/path/to/destination
```

This command will securely copy the specified local file to the designated remote system.

The `rsync` command is another powerful tool for efficient file transfers, as it can perform incremental updates and minimize the amount of data transferred. To use `rsync` to copy a directory from a local machine to a remote server, you can run:

```bash
rsync -avz /path/to/local/directory roadmap@example.com:/path/to/remote/directory
```

The `-avz` options ensure that the transfer is recursive, preserves file attributes, and compresses the data for faster transfer.
