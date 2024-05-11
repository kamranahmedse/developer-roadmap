# Application State

> Do not store application state on servers.

The reason for this is so that if you server gets killed, you won't lose any application state. To that end, sessions should be stored in a database (or some other sort of central storage; memcached, redis, etc.), not on the local filesystem. Examples:

- Logs should be handled via syslog (or similar) and sent to a remote store.
- Uploads should go direct to S3 (don't store on local filesystem and have another process move to S3 for example). For S3 you can use [pre-signed URLs](http://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html) to let your users directly upload to S3 by bypassing your server entirely.
- Any post-processing or long running tasks should be done via an asynchronous queue (SQS is great for this).
