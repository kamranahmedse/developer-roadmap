# Directory Traversal

Directory Traversal, also known as Path Traversal, is a vulnerability that allows attackers to read files on a system without proper authorization. These attacks typically exploit unsecured paths using "../" (dot-dot-slash) sequences and their variations, or absolute file paths. The attack is also referred to as "dot-dot-slash," "directory climbing," or "backtracking."

While Directory Traversal is sometimes combined with other vulnerabilities like Local File Inclusion (LFI) or Remote File Inclusion (RFI), the key difference is that Directory Traversal doesn't execute code, whereas LFI and RFI usually do.

Visit the following resources to learn more:

- [@article@Portswigger's guide on File Path Traversal](https://portswigger.net/web-security/file-path-traversal)
- [@official@OWASP's article on Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal)
- [@course@TryHackMe's room on Path Traversal & File Inclusion](https://tryhackme.com/r/room/filepathtraversal)
- [@article@Acunetix's article on directory traversal](https://www.acunetix.com/websitesecurity/directory-traversal/)
- [@course@HackTheBox Academy's module on File Inclusion & Path Traversal](https://academy.hackthebox.com/course/preview/file-inclusion)
