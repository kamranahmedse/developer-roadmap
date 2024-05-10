# Cgroups

Cgroups, short for control groups, is a Linux kernel feature which allows processes to be organized into hierarchical groups. Its crucial role in containerization, is its ability to limit, account and isolate the resource usage (CPU, memory, disk I/O, etc.) of these process groups.

In the context of containerization, where lightweight isolated environments are running on the same host machine, cgroups become paramount for efficient resource management. By using cgroups, one can ensure that each container doesn't monopolize host resources, leading to improved overall system stability and performance.

Here's an example of how you might create a new cgroup for a container:

```bash
# Create a new cgroup for a container;
sudo cgcreate -g cpu:/my_new_container

# Assign the current shell's process to the new cgroup;
echo $$ | sudo tee /sys/fs/cgroup/cpu/my_new_container/tasks

# Limit the CPU usage of the cgroup to 20%;
echo 200000 | sudo tee /sys/fs/cgroup/cpu/my_new_container/cpu.cfs_quota_us
```

In this snippet, we are using `cgcreate` to create a new cgroup, then adding the current process to it, and finally setting a CPU limit.