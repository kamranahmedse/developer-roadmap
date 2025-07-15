# Buffered vs Unbuffered

Unbuffered channels provide synchronous communication - sender blocks until receiver ready. Buffered channels allow asynchronous communication up to capacity. Unbuffered for coordination/sequencing, buffered for performance/decoupling. Critical distinction for concurrent system design.