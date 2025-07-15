# Cold Start and Limitations

AWS Lambda's cold start refers to the delay experienced when Lambda invokes a function for the first time or after it has updated its code or dependencies. This happens because Lambda needs to do some initial setup, such as initializing the runtime, before it can execute the function code. This setup process adds to the function's execution time, and is particularly noticeable in situations where low latency is critical. Cold start times also vary based on the memory size, with bigger lambda functions taking longer times to start. Further, unused functions may face a cold start again as AWS may clear out idle resources from time to time.

Visit the following resources to learn more:

- [@official@AWS Cold Start and Limitations](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html)
