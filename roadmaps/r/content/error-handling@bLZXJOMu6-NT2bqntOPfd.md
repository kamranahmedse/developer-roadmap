# Error Handling
 
This section covers how to catch and respond to problems in your code instead of letting them crash your script outright. `tryCatch()` lets you run code that might fail and specify what should happen if it does, such as logging a message or returning a default value. This matters for any code that depends on unreliable inputs, like reading files or calling an API.