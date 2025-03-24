# Large File Handling

Handling large files on Cloudflare requires strategies to avoid exceeding size limits and ensure efficient delivery. Techniques include:

- **Streaming:** Processing files in chunks to reduce memory usage.
- **Range Requests:** Serving only the requested portion of a file.
- **Cloudflare Stream:** Using Cloudflare's video streaming service for large video files.
- **R2 integration:** Storing large files in R2 and serving them via Workers.

These methods allow you to handle large files effectively while leveraging Cloudflare's global network.

Visit the following resources to learn more:

- [@official@Resumable and Large Files · Cloudflare Stream](https://developers.cloudflare.com/stream/uploading-videos/resumable-uploads/)
- [@official@Cloudflare R2 Limits](https://developers.cloudflare.com/r2/platform/limits/)