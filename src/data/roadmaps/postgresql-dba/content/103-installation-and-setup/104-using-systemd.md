# Using systemd

In this section, we'll discuss how to manage PostgreSQL using `systemd`, which is the default service manager for many modern Linux distributions (such as CentOS, Ubuntu, and Debian). `systemd` enables you to start, stop, and check the status of PostgreSQL, as well as enable/disable automatic startup at boot time.

## Starting, Stopping, and Restarting PostgreSQL

To start, stop, or restart PostgreSQL using `systemd`, you can use the `systemctl` command, as shown below:

- To start the PostgreSQL service, run:
  ```
  sudo systemctl start postgresql
  ```

- To stop the PostgreSQL service, run:
  ```
  sudo systemctl stop postgresql
  ```

- To restart the PostgreSQL service, run:
  ```
  sudo systemctl restart postgresql
  ```

## Checking PostgreSQL Service Status

To check the status of the PostgreSQL service, you can use the `systemctl status` command:

```bash
sudo systemctl status postgresql
```

This command will display information about the PostgreSQL service, including its current state (active or inactive) and any recent logs.

## Enabling/Disabling PostgreSQL Startup at Boot

To enable or disable the PostgreSQL service to start automatically at boot time, you can use the `systemctl enable` and `systemctl disable` commands, respectively:

- To enable PostgreSQL to start at boot, run:
  ```
  sudo systemctl enable postgresql
  ```

- To disable PostgreSQL from starting at boot, run:
  ```
  sudo systemctl disable postgresql
  ```

## Conclusion

In this section, we covered how to manage PostgreSQL using `systemd`. By using the `systemctl` command, you can start, stop, restart, and check the status of PostgreSQL, as well as enable or disable its automatic startup during boot.