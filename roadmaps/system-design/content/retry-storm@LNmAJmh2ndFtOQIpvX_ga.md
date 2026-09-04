# Retry Storm
 
A retry storm happens when many clients or services retry failed requests at the same time, often after a shared dependency recovers from an outage, overwhelming that dependency again right after it comes back up. This can turn a brief failure into a prolonged outage. Techniques like exponential backoff and jitter help spread out retries to avoid this.

Visit the following resources to learn more:

- [@article@Retry Storm antipattern](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/retry-storm/)
- [@article@How To Avoid Retry Storms In Distributed Systems](https://faun.pub/how-to-avoid-retry-storms-in-distributed-systems-91bf34f43c7f)