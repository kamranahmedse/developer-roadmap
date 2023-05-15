# Use Official SDKs

> If you need to interact with AWS, use the SDK for your langauge.

Don't try to roll your own, I did this at first as I only needed a simple upload to S3, but then you add more services and it's just an all around bad idea. [The AWS SDKs](http://aws.amazon.com/tools/) are well written, handle authentication automatically, handle retry logic, and they're maintained and iterated on by Amazon. Also, if you use EC2 IAM roles (which you absolutely should, more on this later) then the SDK will automatically grab the correct credentials for you.
