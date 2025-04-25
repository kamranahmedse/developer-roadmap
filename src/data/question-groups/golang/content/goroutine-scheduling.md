The runtime employs what is known as an "M:N scheduling strategy", mapping multiple goroutines onto a smaller pool of OS threads. 

The runtime uses logical processors, or "P"s, that maintain queues of ready-to-run goroutines. When a goroutine gets blocked (for example, due to I/O) the scheduler can quickly replace it with another goroutine from the queue, optimizing CPU resources. 

On top of everything, channels further improve this model by serving as built-in communication and synchronization mechanisms. They allow goroutines to exchange data safely and implicitly handle blocking; if a goroutine sends data on a channel without an available receiver, it will wait until one is ready, reducing the need for explicit locks. 

This design not only prevents common concurrency issues like race conditions but also simplifies coordination among goroutines, allowing for a simpler, and more powerful multi-threading model. 