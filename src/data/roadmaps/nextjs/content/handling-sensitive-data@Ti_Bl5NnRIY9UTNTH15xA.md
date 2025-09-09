# Handling Sensitive Data

Sensitive data, like API keys or user credentials, requires careful management to prevent exposure. In Next.js, you should avoid directly embedding such data in client-side code or committing it to your repository. Instead, leverage environment variables and server-side logic to securely access and utilize sensitive information, ensuring it remains protected from unauthorized access.

Visit the following resources to learn more:

- [@official@How to think about data security in Next.js](https://nextjs.org/docs/app/guides/data-security#data-fetching-approaches)
- [@article@How to Think About Security in Next.js](https://nextjs.org/blog/security-nextjs-server-components-actions)