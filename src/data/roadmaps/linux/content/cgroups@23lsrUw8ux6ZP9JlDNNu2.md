# Cgroups

Cgroups (control groups) are a Linux kernel feature that organizes processes into hierarchical groups and limits their resource usage (CPU, memory, disk I/O). Essential for containerization, cgroups prevent containers from monopolizing host resources, ensuring system stability and performance. Use `cgcreate` to create groups, assign processes, and set resource limits effectively.

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