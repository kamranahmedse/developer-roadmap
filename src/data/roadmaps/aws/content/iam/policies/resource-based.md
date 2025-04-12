# Resource-Based

Resource-based policies are attached directly to the AWS resources that receive the permissions. The policy then specifies what actions are allowed or denied on that particular resource. In resource-based policies, you include a `Principal` element in the policy to indicate the IAM users or roles that are granted the permissions. While not all AWS services support resource-based policies, common services that do include Amazon S3 for bucket policies, AWS KMS for key policies, and Amazon SNS for topic policies.

Visit the following resources to learn more:

- [@official@Identity Based Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html)
