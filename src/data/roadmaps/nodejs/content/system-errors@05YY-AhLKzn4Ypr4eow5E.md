# System Errors

Node.js generates system errors when exceptions occur within its runtime environment. These usually occur when an application violates an operating system constraint.
For example, a system error will occur if an application attempts to read a file that does not exist.

Below are the system errors commonly encountered when writing a Node.js program

1. EACCES - Permission denied
2. EADDRINUSE - Address already in use
3. ECONNRESET - Connection reset by peer
4. EEXIST - File exists
5. EISDIR - Is a directory
6. EMFILE - Too many open files in system
7. ENOENT - No such file or directory
8. ENOTDIR - Not a directory
9. ENOTEMPTY - Directory not empty
10. ENOTFOUND - DNS lookup failed
11. EPERM - Operation not permitted
12. EPIPE - Broken Pipe
13. ETIMEDOUT - Operation timed out

Visit the following resources to learn more:

- [@official@Node.js Errors - Official Docs](https://nodejs.org/api/errors.html#errors_class_systemerror)
- [@Article@16 Common Errors in Node.js and How to Fix Them](https://betterstack.com/community/guides/scaling-nodejs/nodejs-errors/)
