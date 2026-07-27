# Caching

Caching is a technique to store frequently accessed data in a temporary storage location (the cache) to speed up retrieval in the future. When data is requested, the system first checks the cache. If the data is present (a "cache hit"), it's served directly from the cache, avoiding the slower process of fetching it from the original source (like a database). If the data isn't in the cache (a "cache miss"), it's retrieved from the original source, stored in the cache, and then served to the user. This reduces latency and improves application performance.

Visit the following resources to learn more:

- [@official@Django’s cache framework](https://docs.djangoproject.com/en/6.0/topics/cache/)
- [@article@Django Caching 101: Understanding the Basics and Beyond](https://dev.to/pragativerma18/django-caching-101-understanding-the-basics-and-beyond-49p)
- [@article@Django Cache Examples with a Complete Project](https://medium.com/django-unleashed/django-cache-examples-with-a-complete-project-7307322756e2)
- [@video@Caching with Redis and Django!](https://www.youtube.com/watch?v=5W2Yff00H8s)