# Understanding Ulimits 

Linux-based containerization technology such as Docker utilizes 'ulimits' as one of the security features to control the resource consumption for each running container. Ulimits (user limits) are a feature of the Linux kernel that restricts the resources that any single user can consume. These resources include open file handles, locked-in physical memory, and others.

Used effectively, ulimits can prevent a rogue or errant process in a particular container from exhausting the server's resources and creating a denial-of-service situation for other containers or processes.

In a containerized environment, it is crucial to skillfully manage these resource limits to ensure optimal performance and security of all containers.

```bash
# To see current ulimits:
ulimit -a

# To set a specific ulimit (soft limit), for example file handles:
ulimit -n 1024
```

Properly configuring and understanding ulimits – especially in containerized environments – is an essential part of system administration in Linux.