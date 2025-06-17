# Rate Limiting

Cloudflare Queues can be used to implement rate limiting. Instead of directly processing every request, you can enqueue them. A consumer Worker then processes messages from the queue at a controlled rate. This prevents your backend systems from being overwhelmed by sudden spikes in traffic. You can adjust the consumer's processing rate to match the capacity of your backend services.

Visit the following resources to learn more:

- [@official@Cloudflare Queues - Queues & Rate Limits](https://developers.cloudflare.com/queues/tutorials/handle-rate-limits/)
- [@official@Rate Limiting Best Practices - Cloudflare Docs](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/)
