# CloudTrail

> Use CloudTrail to keep an audit log.

CloudTrail will log any action performed via the APIs or web console into an S3 bucket. Set up the bucket with versioning to be sure no one can modify your logs, and you then have a complete audit trail of all changes in your account. You hope that you will never need to use this, but it's well worth having for when you do.