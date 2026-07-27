# Cgroups

Cgroups (control groups) are a Linux kernel feature that organizes processes into hierarchical groups and limits their resource usage (CPU, memory, disk I/O). Essential for containerization, cgroups prevent containers from monopolizing host resources, ensuring system stability and performance. Use `cgcreate` to create groups, assign processes, and set resource limits effectively.

Visit the following resources to learn more:

- [@official@Control Groups — The Linux Kernel](https://docs.kernel.org/admin-guide/cgroup-v1/)
- [@article@cgroups — Linux manual page](https://www.man7.org/linux/man-pages/man7/cgroups.7.html)
- [@article@Introduction to Control Groups (Cgroups)](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/resource_management_guide/chap-introduction_to_control_groups)