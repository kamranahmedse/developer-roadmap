# Using `pg_upgrade`

# Using `pg_upgrade`

`pg_upgrade` is a utility that allows you to perform an in-place upgrade of your PostgreSQL database from one major version to another. This utility is highly efficient as it does not require the creation of a new cluster or the use of SQL dump and restore. It achieves this by directly modifying the system catalogues and updating the data files' pointers with the new database version.

## Benefits of `pg_upgrade`

- Quick and efficient upgrades without the need to dump and restore the entire database.
- Manages upgrades spanning multiple major PostgreSQL versions.
- Supports custom installations and different platforms.

## Steps to use `pg_upgrade`

1. **Install the new PostgreSQL version**: First, you need to install the new major version of PostgreSQL on your system. Make sure to leave the old version intact.

2. **Stop the old PostgreSQL server**: To avoid any conflicts or data corruption, shut down the old PostgreSQL server before running the `pg_upgrade` process.

3. **Create a new data directory**: Create a new empty data directory for the new PostgreSQL version. Ensure that the same user who owns the old data directory owns the new directory as well.

4. **Perform the upgrade**: Run the `pg_upgrade` command to perform the upgrade. Specify the paths of the old and new data directories and executables, such as:
   ```
   pg_upgrade \
       --old-datadir /path/to/old/data/dir \
       --new-datadir /path/to/new/data/dir \
       --old-bindir /path/to/old/bin/dir \
       --new-bindir /path/to/new/bin/dir
   ```

5. **Check for errors**: During the upgrade process, `pg_upgrade` creates log files in the home directory. Review these logs to ensure that there were no errors during the upgrade.

6. **Start the new PostgreSQL server**: Once the upgrade process is complete, start the new PostgreSQL server with the new data directory.

7. **Run analyze**: As a final step, run the `ANALYZE` command on the new system, to ensure that the planner has accurate statistics.

8. **Check and remove old data**: Use the new server for a while and ensure everything is working as expected before deleting the old data directory.

## Rollback plan

In case the upgrade process fails or you encounter issues in the new version, you can always roll back to the old version. To do this, simply stop the new PostgreSQL server and restart the old server with the old data directory in the configuration file.

## Conclusion

`pg_upgrade` is an essential tool for any PostgreSQL DBA, as it greatly simplifies the process of upgrading to a new major version. By following the steps outlined above, you can perform quick and efficient upgrades with minimal downtime.