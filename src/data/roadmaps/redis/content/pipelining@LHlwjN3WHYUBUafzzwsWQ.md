# Pipelining

Pipelining in Redis is a technique that allows clients to send multiple commands to the server without waiting for individual responses after each command. Instead, the commands are sent in a batch, and responses are read together at the end. This reduces the network overhead and latency associated with multiple round trips, significantly improving throughput, especially in high-volume operations. Pipelining is commonly used for bulk data insertions, batch processing, or any scenario where multiple commands need to be executed in sequence, offering a more efficient alternative to executing commands one by one. However, since commands are queued and executed in a batch, error handling may require additional considerations.

Learn more from the following resources:

