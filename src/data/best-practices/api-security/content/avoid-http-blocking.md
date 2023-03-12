# Avoid HTTP Blocking

> Avoid HTTP blocking if you are using huge amount of data by moving the HTTP heavy operations to background jobs or asynchronous tasks.

HTTP blocking is a common issue in web applications. It occurs when the application is unable to process incoming HTTP requests due to a large number of requests or a large amount of data. This can lead to the application becoming unresponsive and the server crashing. This can be prevented by moving HTTP heavy operations to background jobs or asynchronous tasks. You can use a message queue to queue the requests and process them in the background. This will allow the application to continue processing other requests while the heavy operations are being processed in the background.