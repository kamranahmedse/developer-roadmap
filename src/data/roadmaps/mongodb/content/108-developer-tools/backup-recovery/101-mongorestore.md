# mongorestore

`mongorestore` is a utility tool that comes with MongoDB and is used to restore a binary database dump from `mongodump`. It is particularly helpful in scenarios where you need to recover your database, migrate data between MongoDB instances, or manage your data backup strategy.

## Features

- Restores BSON data from a `mongodump` output
- Supports multiple formats, such as gzip
- Allows filtering documents during restore
- Can restore data to a new MongoDB instance, or into an existing database and collection

## Usage

Here's a basic usage of `mongorestore`:

```bash
mongorestore /path/to/your/dump/folder
```

This command will restore the dump in the specified folder.

## Common Options

- `--host`: Specifies the target MongoDB instance (default: `localhost`).
- `--port`: Specifies the port number of the target MongoDB instance (default: `27017`).
- `--username`: Specifies the username for authentication (if needed).
- `--password`: Specifies the password for authentication (if needed).
- `--authenticationDatabase`: Specifies the database that holds the user's credentials (default: `admin`).
- `--db`: Specifies a single database to restore (default: all databases in the dump folder).
- `--collection`: Specifies a single collection to restore (default: all collections in the dump folder).
- `--drop`: Drops the database or collection before importing data.
- `--gzip`: Decompresses the input BSON files before importing (use with compressed dumps).
- `--archive`: Reads/writes the database dump as an archive file.
- `--nsExclude`: Exclude namespaces with the specified pattern from the restore.

## Examples

Restore only a specific database:

```bash
mongorestore --db=mydatabase /path/to/your/dump/folder
```

Restore using gzip format:

```bash
mongorestore --gzip /path/to/your/compressed/dump/folder
```

Restore with authentication:

```bash
mongorestore --username=myUser --password=myPassword /path/to/your/dump/folder
```

Restore to a remote MongoDB instance:

```bash
mongorestore --host=remoteHost --port=27017 /path/to/your/dump/folder
```

**Important**: Ensure you have proper backups of your data, and test the restore process periodically to validate your backup strategy.
