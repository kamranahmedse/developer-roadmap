# Linux Logical Volume Manager (LVM)

The Linux Logical Volume Manager (LVM) is a device mapper framework that provides logical volume management for the Linux kernel. It was created to ease disk management, allowing for the use of abstracted storage devices, known as logical volumes, instead of using physical storage devices directly. 

LVM is extremely flexible, and features include resizing volumes, mirroring volumes across multiple physical disks, and moving volumes between disks without needing to power down.

LVM works on 3 levels: Physical Volumes (PVs), Volume Groups (VGs), and Logical Volumes (LVs).

- PVs are the actual disks or partitions.
- VGs combine PVs into a single storage pool.
- LVs carve out portions from the VG to be used by the system.

To create an LVM, you need to follow these steps in Linux:

```bash
pvcreate /dev/sdb1
vgcreate my-vg /dev/sdb1
lvcreate -L 10G my-vg -n my-lv
```
In the above commands, we create a physical volume on `/dev/sdb1`, then create a volume group named `my-vg`. Finally, we carve out a 10GB logical volume from the volume group and name it `my-lv`.

These features, collectively, provide great ease in managing storage systems especially for large enterprise class systems where a large array of disks are typically used.