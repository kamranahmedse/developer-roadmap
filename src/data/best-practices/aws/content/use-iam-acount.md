# Use IAM Acounts

> Everyone gets an IAM account. Never login to the master.

Usually you'll have an "operations account" for a service, and your entire ops team will have the password. With AWS, you definitely don't want to do that. Everyone gets an IAM user with just the permissions they need (least privilege). An IAM user can control everything in the infrastructure. At the time of writing, the only thing an IAM user can't access are some parts of the billing pages.

If you want to protect your account even more, make sure to [enable multi-factor authentication](http://aws.amazon.com/iam/details/mfa/) for everyone (you can use Google Authenticator). I've heard of some users who give the MFA token to two people, and the password to two others, so to perform any action on the master account, two of the users need to agree. This is overkill for my case, but worth mentioning in case someone else wants to do it.

