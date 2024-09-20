# Runtime Security

Runtime security focuses on ensuring the security of Docker containers while they are running in production. This is a critical aspect of container security, as threats may arrive or be discovered after your containers have been deployed.

- Ensure that your containers are regularly scanned for vulnerabilities, both in the images themselves and in the runtime environment.
- Isolate your containers' resources, such as CPU, memory, and network, to prevent a single compromised container from affecting other containers or the host system.
- Maintain audit logs of container activity to help with incident response, troubleshooting, and compliance.

## Least Privilege Principle

- Run your containers as a non-root user whenever possible.
- Avoid running privileged containers, which have access to all of the host's resources.
- Use Linux capabilities to strip away unnecessary permissions from your containers.

## Read-only Filesystems

- Use the `--read-only` flag when starting your containers to make their filesystems read-only.
- Implement volume mounts or `tmpfs` mounts for locations that require write access.

Visit the following resources to learn more:

- [@official@Docker Security](https://docs.docker.com/engine/security/)
- [@official@Docker Security Best Practices](https://docs.docker.com/build/building/best-practices/)
