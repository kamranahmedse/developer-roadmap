# SFTP

**SFTP** (Secure File Transfer Protocol) is a network protocol designed to securely transfer files over an encrypted connection, usually via SSH (Secure Shell). SFTP provides file access, file transfer, and file management functionalities, making it a popular choice for secure file transfers between a client and a server.

## Key features of SFTP

* **Security**: SFTP automatically encrypts data before it is sent, ensuring that your files and sensitive data are protected from unauthorized access while in transit.

* **Authentication**: SFTP relies on SSH for user authentication, allowing you to use password-based, public key, or host-based authentication methods.

* **File Integrity**: SFTP uses checksums to verify that transferred files have maintained their integrity during transport, allowing you to confirm that files received are identical to those sent.

* **Resume Capability**: SFTP offers support for resuming interrupted file transfers, making it an ideal choice for transferring large files or transferring files over potentially unreliable connections.

## How SFTP works

SFTP operates over an established SSH connection between the client and server. Upon successful SSH authentication, the client can issue commands to the server, such as to list, upload, or download files. The data transferred between the client and server is encrypted, ensuring that sensitive information is not exposed during the transfer process.

## When to use SFTP

SFTP is an ideal choice whenever you need to securely transfer files between a client and a server. Examples of when you might want to use SFTP instead of other protocols include:

* Transferring sensitive data such as customer information, financial records, or intellectual property.
* Uploading or downloading files to/from a remote server in a secure manner, especially when dealing with confidential data.
* Managing files on a remote server, which may involve creating, renaming, or deleting files and directories.

Overall, SFTP provides a secure and reliable way of transferring files over the internet, making it an essential tool for maintaining the integrity and confidentiality of your data in today's cyber security landscape.