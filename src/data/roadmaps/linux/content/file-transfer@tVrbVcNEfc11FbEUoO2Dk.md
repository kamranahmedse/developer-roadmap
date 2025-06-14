# File Transfer

Linux file transfer involves copying or moving files between systems over networks. Command-line tools support protocols like FTP, HTTP, SCP, SFTP, and NFS. Common commands include `scp`, `rsync`, and `wget`. Example: `scp /local/file username@remote:/destination` copies files to remote systems. These tools make network file sharing streamlined, easier, and more secure.

For instance, when transferring a file from a local machine to a remote server, the `scp` command can be utilized as follows:
```bash
scp /path/to/local/file username@remote:/path/to/destination
```
This command would copy the file to the designated remote system.

Understanding and efficiently using these tools can make the task of file sharing over networks streamlined, easier, and more secure.