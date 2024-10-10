# Backup / Restore

`Backup Restore` in AWS RDS provides the ability to restore your DB instance to a specific point in time. When you initiate a point-in-time restore, a new DB instance is created and all transactions that occurred after the specified point-in-time are not part of the new DB instance. You can restore up to the last restorable time (typically within the last five minutes) as indicated in the AWS RDS Management Console. The time it takes to create the restore depends on the difference in time between when you initiate the restore and the time you are restoring to. The process happens with no impact on the source database and you can continue using your database during restore.

Visit the following resources to learn more:

- [@official@Backup & Restore - RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html)
