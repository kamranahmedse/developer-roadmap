# Super User (root) in Linux

The **super user** (also known as **root**) is the account on Unix-like systems with **UID 0**. It has full control over the system: it can read or write any file, kill any process, bind to low‐numbered ports, install or remove software, change other users’ passwords, load kernel modules, and more.

> **⚠️ Warning:** Mistakes as root can brick your system, wipe data, or open security holes. Always proceed with caution.

---

## Table of Contents

1. [Becoming root: `su` vs. `sudo`](#becoming-root-su-vs-sudo)  
2. [Configuring `sudo`](#configuring-sudo)  
3. [Root vs. Privileged Users](#root-vs-privileged-users)  
4. [Security Best Practices](#security-best-practices)  
5. [When to use `root` vs. `sudo`](#when-to-use-root-vs-sudo)  
6. [Further Reading](#further-reading)

---

## Becoming root: `su` vs. `sudo`

| Command       | What it does                                    | Password prompt        | Environment                     | Logging                       |
|---------------|-------------------------------------------------|------------------------|---------------------------------|-------------------------------|
| `su -`        | Switch to root user (login shell)               | root’s password        | root’s login env (`$HOME`, `$PATH`) | none by default               |
| `sudo <cmd>`  | Run one command as root (or another user)       | your own password      | your normal env (with resets)    | logged to `/var/log/auth.log` |

### Examples

```bash
# Full root login shell (reads root’s shell startup files)
$ su -

# Run one command as root (if you're in sudoers)
$ sudo apt update
