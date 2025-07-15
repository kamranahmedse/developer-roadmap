# Versioning / Aliases

In AWS Lambda, **Versioning** provides a way to manage distinct and separate iterations of a Lambda function, enabling both risk reduction and more efficient development cycles. Conversely, an **Alias** is a pointer to a specific Lambda function version. Aliases are mutable; they can be re-associated to a different version, manifesting a form of flexibility. With aliases, one can avoid direct updating of event triggers or downstream services as they can point to an alias and the corresponding version can be updated, hence separating the infrastructure/code changes.

Visit the following resources to learn more:

- [@official@AWS Lambda Versioning](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
