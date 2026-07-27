# Users / Groups Permissions

Linux users, groups, and file permissions control access to files and resources on the system. In Docker, understanding these concepts is important because containers run processes as specific users, and the permissions model determines what files a containerized application can read, write, or execute. By default, containers run as root, which poses security risks, so it is a best practice to create non-root users in your Dockerfile using `RUN useradd` and switch to them with the `USER` instruction. Commands like `chmod`, `chown`, and `chgrp` help you set the correct permissions on files and directories within your container images.

Visit the following resources to learn more:

- [@article@Linux File Permissions Explained](https://www.redhat.com/en/blog/linux-file-permissions-explained)
- [@article@Users and Groups in Linux](https://wiki.archlinux.org/title/Users_and_groups)
- [@official@Dockerfile USER Instruction](https://docs.docker.com/reference/dockerfile/#user)
- [@feed@Explore top posts about Docker](https://app.daily.dev/tags/docker?ref=roadmapsh)
