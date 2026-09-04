# Task Queues
 
A task queue holds units of work, called tasks, that are processed asynchronously by one or more worker processes. Producers add tasks to the queue, and workers pull tasks off and execute them independently of the request that created them. This decouples slow or resource-intensive work from the main application flow.

Visit the following resources to learn more:

- [@article@Celery - Distributed Task Queue](https://docs.celeryq.dev/en/stable/)