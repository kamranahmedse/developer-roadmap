# S3 Keys

> Use random strings at the start of your keys.

This seems like a strange idea, but one of the implementation details of S3 is that Amazon use the object key to determine where a file is physically placed in S3. So files with the same prefix might end up on the same hard disk for example. By randomising your key prefixes, you end up with a better distribution of your object files. (Source: [S3 Performance Tips & Tricks](https://aws.amazon.com/blogs/aws/amazon-s3-performance-tips-tricks-seattle-hiring-event/))
