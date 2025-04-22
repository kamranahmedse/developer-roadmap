Channels in Go are used to transfer data between goroutines safely. 

Best practices include:
* Closing channels when they are no longer needed, letting receivers know they don't have to wait indefinitely.  
* Ensuring that channels are buffered when necessary, because buffered channels allow you to send a fixed number of values without blocking the sender immediately. This can be useful when you know the maximum number of items that might be sent, which helps in avoiding deadlocks.  
* Use the `select` statement when working with multiple channels. It helps in waiting on multiple channel operations simultaneously, making your concurrent code more robust. 