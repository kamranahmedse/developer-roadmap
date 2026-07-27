# Address Conversion

In socket programming, address conversion functions are important for handling internet addresses. Functions like `inet_pton()` (presentation to network) and `inet_ntop()` (network to presentation) are frequently used. `inet_pton()` function converts an IP address in human-friendly format (IPv4 addresses in dotted-decimal notation or IPv6 addresses in hexadecimal notation) to its equivalent binary form. Conversely, `inet_ntop()` function does the reverse, i.e., it converts an IP address in binary form to human-friendly format. These functions are important tools when dealing with IP addresses in lower-level network programming.
Visit the following resources to learn more:

- [@official@inet_pton(3) - Linux Manual Page - man7.org](https://man7.org/linux/man-pages/man3/inet_pton.3.html)
- [@official@inet_pton - The Open Group Base Specifications](https://pubs.opengroup.org/onlinepubs/009619199/inet_pton.htm)
- [@official@inet_pton(3) - OpenBSD Manual Pages](https://man.openbsd.org/inet_pton.3)
