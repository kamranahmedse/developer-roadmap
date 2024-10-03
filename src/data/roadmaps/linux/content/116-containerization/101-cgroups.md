# Control Groups (Cgroups)

Control Groups (Cgroups) is a Linux kernel feature that allows processes to be organized into hierarchical groups. Its crucial role in containerization is its ability to limit, account for, and isolate the resource usage (CPU, memory, disk I/O, etc.) of these process groups.

In the context of containerization, where lightweight isolated environments are running on the same host machine, Cgroups become paramount for efficient resource management. By using Cgroups, you can ensure that each container doesn't monopolize host resources, leading to improved overall system stability and performance.

Here's an example of how you might create a new Cgroup for a container on Ubuntu Linux:

```bash
# Create a new Cgroup for a container
sudo cgcreate -g cpu:/roadmap_container

# Assign the current shell's process to the new Cgroup
echo $$ | sudo tee /sys/fs/cgroup/cpu/roadmap_container/tasks

# Limit the CPU usage of the Cgroup to 20%
echo 200000 | sudo tee /sys/fs/cgroup/cpu/roadmap_container/cpu.cfs_quota_us
```

In this example, we are using `cgcreate` to create a new Cgroup named `roadmap_container`, then adding the current process to it, and finally setting a CPU limit of 20%.
