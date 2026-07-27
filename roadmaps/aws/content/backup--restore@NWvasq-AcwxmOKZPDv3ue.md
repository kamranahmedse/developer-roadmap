# Backup / Restore

In AWS, DynamoDB has built-in support for data backup and restore features. This includes both on-demand and continuous backups. On-demand backups allow you to create complete backups of your tables for long-term retention and archival, helping meet corporate and governmental regulatory requirements. Continuous backups enable you to restore your table data to any point in time in the last 35 days, thus offering protection from accidental writes or deletes. During a restore operation, you can choose to restore the data to a new DynamoDB table or overwrite data in an existing table. These backups include all necessary metadata, including DynamoDB global secondary indexes.

Visit the following resources to learn more:

- [@official@Backup & Restore](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Backup-and-Restore.html)
