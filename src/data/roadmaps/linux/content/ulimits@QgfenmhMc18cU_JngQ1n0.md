# Ulimits

Ulimits (user limits) are Linux kernel features that restrict resources like file handles and memory that processes can consume. In containerization, ulimits prevent rogue processes from exhausting server resources and creating denial-of-service situations. Use `ulimit -a` to view current limits and `ulimit -n 1024` to set specific limits for optimal container performance and security.

Learn more from the following resources:

- [@article@Check and set user limits with ulimit Linux command](https://linuxconfig.org/limit-user-environment-with-ulimit-linux-command)
- [@article@How to Use Ulimit Command in Linux](https://linuxhandbook.com/ulimit-command/)
- [@article@10 Linux Troubleshooting Tips](https://www.dummies.com/article/technology/computers/operating-systems/linux/10-linux-troubleshooting-tips-274301/)