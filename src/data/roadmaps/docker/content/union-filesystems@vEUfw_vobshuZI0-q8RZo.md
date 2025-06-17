# Union Filesystems

Union filesystems (UnionFS) create virtual, layered file structures by overlaying multiple directories without modifying originals. Docker uses this to manage storage efficiently by minimizing duplication and reducing image sizes through layered filesystem approach that keeps directory contents separate while mounted together.

Visit the following resources to learn more:

- [@article@AUFS (Advanced Multi-Layered Unification Filesystem)](http://aufs.sourceforge.net/)
- [@article@OverlayFS (Overlay Filesystem)](https://www.kernel.org/doc/html/latest/filesystems/overlayfs.html)
- [@article@Btrfs (B-Tree Filesystem)](https://btrfs.readthedocs.io/en/stable/)
- [@article@ZFS (Z File System)](https://zfsonlinux.org/)
