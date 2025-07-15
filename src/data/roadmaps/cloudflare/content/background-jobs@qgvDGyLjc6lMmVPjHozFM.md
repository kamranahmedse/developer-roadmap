# Background Jobs

Cloudflare Queues are ideal for handling background jobs. Instead of performing time-consuming tasks directly within a request/response cycle, you can enqueue a message describing the task. A separate Worker, acting as a consumer, then processes these messages in the background. This improves the responsiveness of your application and allows you to handle tasks like image processing, sending emails, or data analysis without blocking user requests.

Visit the following resources to learn more:

- [@official@Cloudflare Queues](https://developers.cloudflare.com/queues/)
- [@article@Dispatched | Background Jobs for Serverless Applications](https://dispatched.dev/)