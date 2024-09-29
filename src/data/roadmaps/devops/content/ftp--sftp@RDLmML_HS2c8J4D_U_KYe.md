# FTP / SFTP

FTP (File Transfer Protocol) is a standard network protocol used for transferring files between a client and a server on a computer network. It operates on a client-server model, typically using separate control and data connections between the client and server. FTP allows users to upload, download, and manage files on remote systems, supporting both authenticated and anonymous access. While widely used for its simplicity and compatibility, FTP has security limitations as it transmits data and credentials in plain text. As a result, more secure alternatives like SFTP (SSH File Transfer Protocol) and FTPS (FTP Secure) have gained popularity for sensitive data transfers. Despite its age, FTP remains in use for various file transfer needs, especially in legacy systems and where security is less critical. 

SFTP (SSH File Transfer Protocol) is a secure file transfer protocol that provides file access, transfer, and management functionalities over a secure shell (SSH) data stream. It's designed as an extension of SSH to offer secure file transfer capabilities. SFTP encrypts both commands and data in transit, protecting against eavesdropping and man-in-the-middle attacks. Unlike traditional FTP, SFTP uses a single connection and doesn't separate control and data channels. It supports features like resuming interrupted transfers, directory listings, and remote file removal. SFTP is widely used in enterprise environments for secure file transfers, automated scripts, and as a more secure alternative to FTP. Its integration with SSH makes it a preferred choice for system administrators and developers working with remote systems securely.

Visit the following resources to learn more:

- [@article@FTP vs SFTP vs FTPS](https://www.fortinet.com/resources/cyberglossary/file-transfer-protocol-ftp-meaning)
- [@article@What is SFTP?](https://www.kiteworks.com/risk-compliance-glossary/sftp/)
