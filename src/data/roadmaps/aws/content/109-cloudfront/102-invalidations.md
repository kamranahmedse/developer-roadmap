# Invalidations

`Invalidations` in AWS CloudFront is a concept where you remove files (objects) from CloudFront cache before it hits the expiration period. AWS CloudFront, like any other CDN, stores copies of your website’s static files in its cache until and unless it reaches its TTL (time to live) duration. But in some situations, you might want to remove or replace these files. For instance, these could be changes in CSS or JS files. This is where Invalidations come to the scene. With this, you can immediately remove objects or files from edge locations.

Visit the following resources to learn more:

- [@official@Invalidations Cloudfront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
