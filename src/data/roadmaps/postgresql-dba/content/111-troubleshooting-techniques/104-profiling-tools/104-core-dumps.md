# Core Dumps

A core dump is a file that contains the memory image of a running process and its process status. It's typically generated when a program crashes or encounters an unrecoverable error, allowing developers to analyze the state of the program at the time of the crash. In the context of PostgreSQL, core dumps can help diagnose and fix issues with the database system.

In this section, we'll discuss:

- Configuring PostgreSQL to generate core dumps
- Analyzing core dumps

## Configuring PostgreSQL to Generate Core Dumps

By default, core dumps may be disabled on your system or have limited size restrictions. To enable core dumps in PostgreSQL, you'll need to modify the following operating system settings.

* **ulimit** - Set the core file size limit to "unlimited" for the PostgreSQL process by updating the `ulimit` configuration:

  ```
  ulimit -c unlimited
  ```

* **sysctl** - Enable core dumps for setuid (user ID change on execution) programs. Edit `/etc/sysctl.conf` file (or create it if it doesn't exist) and add the following line:

  ```
  fs.suid_dumpable=2
  ```

  Apply changes by running:

  ```
  sysctl -p
  ```

* **PostgreSQL configuration** - Set the `debug_assertions` configuration parameter to "on" in `postgresql.conf`:

  ```
  debug_assertions = on
  ```

  Restart PostgreSQL for the changes to take effect.

## Analyzing Core Dumps

When a core dump occurs, it's saved in the current working directory of the PostgreSQL process. You can use debugging tools like `gdb` (GNU Debugger) to analyze the core dump.

Here is a simple step-by-step guide to analyze a core dump using `gdb`:

- Install `gdb` if it's not already installed on your system:

   ```
   sudo apt-get install gdb
   ```

- Locate the core dump file (usually named `core` or `core.<pid>`).

- Run `gdb` with the PostgreSQL binary and the core dump file as arguments:

   ```
   gdb /path/to/postgres-binary /path/to/core-dump
   ```

- Once `gdb` starts, you can issue commands to examine the state of the program:

   * `bt` (backtrace) - displays the call stack at the time of the crash
   * `frame <number>` - select a specific frame in the call stack
   * `info locals` - display local variables in the current frame

- When you're done analyzing, exit `gdb` by entering the command `quit`.

Remember, core dumps can contain sensitive information, such as table data or user passwords, so make sure to handle them securely and delete them when no longer needed.