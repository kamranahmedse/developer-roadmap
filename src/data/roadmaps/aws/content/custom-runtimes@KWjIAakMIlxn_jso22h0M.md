# Custom Runtimes

AWS Lambda supports several preconfigured runtimes for you to choose from, including Node.js, Java, Ruby, Python, and Go. However, if your preferred programming language or specific language version isn't supported natively, you can use **custom runtimes**. A custom runtime in AWS Lambda is a Linux executable that handles invocations and communicates with the Lambda service. It enables you to use any programming language to handle AWS Lambda events. The runtime is responsible for running the bootstrap, which is an executable file, to start the execution process environment, process incoming requests, and manage interaction between your function code and the infrastructure.

Visit the following resources to learn more:

- [@official@AWS Lambda Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
