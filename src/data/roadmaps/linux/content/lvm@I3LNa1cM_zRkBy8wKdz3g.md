# LVM (Logical Volume Manager)

LVM provides logical volume management through device mapper framework, offering flexible disk management with resizing, mirroring, and moving capabilities. Three levels: Physical Volumes (PVs - actual disks), Volume Groups (VGs - storage pools), and Logical Volumes (LVs - carved portions). Create with `pvcreate`, `vgcreate`, and `lvcreate` commands. Essential for enterprise storage systems.

To create an LVM, you need to follow these steps in Linux:

```bash
pvcreate /dev/sdb1
vgcreate my-vg /dev/sdb1
lvcreate -L 10G my-vg -n my-lv
```
In the above commands, we create a physical volume on `/dev/sdb1`, then create a volume group named `my-vg`. Finally, we carve out a 10GB logical volume from the volume group and name it `my-lv`.

These features, collectively, provide great ease in managing storage systems especially for large enterprise class systems where a large array of disks are typically used.