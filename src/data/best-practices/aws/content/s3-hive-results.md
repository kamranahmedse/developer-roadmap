# Hive Results

> Specify a directory on S3 for Hive results.

If you use Hive to output results to S3, you must specify a directory in the bucket, not the root of the bucket, otherwise you'll get a rather unhelpful NullPointerException with no real explanation as to why.