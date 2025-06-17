# Ulimits

Ulimits (user limits) are Linux kernel features that restrict resources like file handles and memory that processes can consume. In containerization, ulimits prevent rogue processes from exhausting server resources and creating denial-of-service situations. Use `ulimit -a` to view current limits and `ulimit -n 1024` to set specific limits for optimal container performance and security.

```bash
# To see current ulimits:
ulimit -a

# To set a specific ulimit (soft limit), for example file handles:
ulimit -n 1024
```

Properly configuring and understanding ulimits – especially in containerized environments – is an essential part of system administration in Linux.