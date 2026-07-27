# Bucket Lifecycle

The lifecycle of an R2 bucket involves creation, usage (storing and retrieving objects), and eventual deletion. You create a bucket to house your data. Objects are then uploaded, accessed, and managed within the bucket. Cloudflare doesn't have built-in lifecycle rules like some other storage providers, so object expiration typically requires custom logic via Workers. Finally, when the bucket is no longer needed, and after ensuring it's empty, you can delete it.

Visit the following resources to learn more:

- [@official@Buckets · Cloudflare R2](https://developers.cloudflare.com/r2/buckets/)
- [@official@Bucket Lifecycle · Cloudflare R2](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/lifecycle/) 