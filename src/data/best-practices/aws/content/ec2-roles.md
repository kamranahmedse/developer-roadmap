# EC2 Roles

> Use EC2 roles, do not give applications an IAM account.

If your application has AWS credentials baked into it, you're "doing it wrong". One of the reasons it's important to use the AWS SDK for your language is that you can really easily use EC2 IAM roles. The idea of a role is that you specify the permissions a certain role should get, then assign that role to an EC2 instance. Whenever you use the AWS SDK on that instance, you don't specify any credentials. Instead, the SDK will retrieve temporary credentials which have the permissions of the role you set up. This is all handled transparently as far as you're concerned. It's secure, and extremely useful.
