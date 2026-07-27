# What and why use them?
 
Messaging systems solve the problem of tight coupling between systems. Instead of one service directly calling another, it sends a message to a broker, and the consumer reads it when ready. This improves reliability, scalability, and flexibility, especially when producers and consumers operate at different speeds or scales.