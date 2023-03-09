# Bucket Names

> Use "-" instead of "." in bucket names for SSL.

If you ever want to use your bucket over SSL, using a "." will cause you to get certificate mismatch errors. You can't change bucket names once you've created them, so you'd have to copy everything to a new bucket.