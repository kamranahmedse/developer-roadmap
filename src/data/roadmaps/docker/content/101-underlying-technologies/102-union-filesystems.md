# Union Filesystems

Union filesystems, also known as UnionFS, play a crucial role in the overall functioning of Docker. It's a unique type of filesystem that creates a virtual, layered file structure by overlaying multiple directories. Instead of modifying the original file system or merging directories, UnionFS enables the simultaneous mounting of multiple directories on a single mount point while keeping their contents separate. This feature is especially beneficial in the context of Docker, as it allows us to manage and optimize storage performance by minimizing duplication and reducing the container image size.

These are some of the essential features of union filesystems:

- **Layered Structure**: UnionFS builds a layered structure consisting of multiple read-only layers and a top writable layer. This structure enables efficient handling of changes by only updating the writable layer, while the read-only layers preserve the original data.

- **Copy-on-Write**: The copy-on-write (COW) mechanism is an indispensable feature of UnionFS. If a container makes changes to an existing file, the system creates a copy of the file in the writable layer, leaving the original file in the read-only layer untouched. This process restricts modification to the topmost layer, ensuring a fast and resource-efficient operation.

- **Resource Sharing**: Union filesystems allow multiple containers to share common base layers while running separately. This feature prevents resource duplication and saves significant storage space.

- **Fast Container Initialization**: Union filesystems make it possible to create new containers instantly by merely creating a new writable layer on existing read-only layers. This quick initialization reduces the overhead of duplicated file operations, ultimately improving performance.

## Popular Union Filesystems in Docker

Docker supports multiple union filesystems that facilitate building and managing containers. Some of the popular options include:

- [@article@**AUFS (Advanced Multi-Layered Unification Filesystem)**](http://aufs.sourceforge.net/)
- [@article@**OverlayFS (Overlay Filesystem)**](https://www.kernel.org/doc/html/latest/filesystems/overlayfs.html)
- [@article@**Btrfs (B-Tree Filesystem)**](https://btrfs.wiki.kernel.org/index.php/Main_Page)
- [@article@**ZFS (Z File System)**](https://zfsonlinux.org/)
