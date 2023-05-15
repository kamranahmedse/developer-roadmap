# Startup Management (init.d)

`init.d` is a daemon which is the **first process** (PID = 1) of the Linux system. Then other processes, services, daemons, and threads are started by init. One can write their own scripts in _'/etc/init.d'_ location to start services automatically on system boot. Services can be started and stopped manually by using `service` command.

It has following syntax: `$ service [service_name] [action]` e.g. `$ service ssh start`

Visit the following resources to learn more:

- [Linux Booting Process](https://www.freecodecamp.org/news/the-linux-booting-process-6-steps-described-in-detail/)
- [What is init.d?](https://www.geeksforgeeks.org/what-is-init-d-in-linux-service-management/)
- [What are Daemons in Linux?](https://itsfoss.com/linux-daemons/)
