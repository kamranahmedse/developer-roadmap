# Creating / Invoking Functions

To create a Lambda function in AWS, navigate to the AWS Management Console, select "Lambda" under "Compute" and then "Create function". Specify the function name, execution role and runtime environment. Once the function is created, you can write or paste the code into the inline editor. To invoke a Lambda function, you can either do it manually, via an API gateway, or schedule it. Manually invoking can be done by selecting your function in the AWS console, then "Test", add the event JSON and "Test" again. If set up with an API gateway, it'll be triggered when the endpoints are hit. Scheduling involves using AWS Cloudwatch to trigger the functions periodically.

Visit the following resources to learn more:

- [@official@Create Your First Lambda Function](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)
