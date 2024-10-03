# Filesystem Mounting in Linux

In the Linux operating system, the concept of "mounting" is crucial for managing storage devices and accessing data. Mounting refers to the process of attaching a filesystem (a data structure on a storage medium) to a specific directory in the Linux directory tree, allowing the system to read and write data to that storage device.

The beauty of this approach is the unified and seamless manner in which Linux treats all files, regardless of whether they reside on a local disk, a network location, or any other type of storage device. This abstraction provides a consistent user experience and simplifies file management.

The `mount` command is used to mount filesystems in Linux. When a specific filesystem is mounted at a particular directory, the system can begin reading data from the device and interpreting it according to the filesystem's rules.

It's worth noting that Linux has a special directory, `/mnt`, that is conventionally used as a temporary mount point for manual mounting and unmounting operations.

Here's an example of how to mount a filesystem on Ubuntu Linux:

```bash
# Mount a partition on the second hard drive to the /roadmap/storage directory
sudo mkdir -p /roadmap/storage
sudo mount /dev/sdb1 /roadmap/storage
```

In this example, we first create the `/roadmap/storage` directory, which will serve as the mount point. Then, we use the `mount` command to attach the filesystem on the second partition of the second hard drive (`/dev/sdb1`) to the `/roadmap/storage` directory.

After the filesystem is mounted, you can access the files and directories within it using the `/roadmap/storage` path.
