# Filtering

In Cloudflare Email Workers, filtering is the process of selectively acting on emails based on specific criteria. It allows you to define rules that determine which emails your worker will process and how. Filtering can be based on various email attributes, including:

- **Sender/Recipient:** Matching specific email addresses or domains.
- **Subject Line:** Looking for keywords or patterns in the subject.
- **Headers:** Examining specific header values.
- **Content:** Analyzing the email body for certain keywords.

By implementing filtering, you can ensure that your worker only processes relevant emails, optimizing performance and preventing unintended actions on unrelated messages.

Visit the following resources to learn more:

- [@official@Email Workers · Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/email-workers/)
- [@article@Implementing an Email Delivery Service with Cloudflare Workers](https://medium.com/@georgechmr/implementing-an-email-delivery-service-with-cloudflare-workers-c141422109d0)
