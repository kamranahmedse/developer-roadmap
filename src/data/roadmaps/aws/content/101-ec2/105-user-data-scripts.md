# User Data Scripts

"User Data Scripts" in EC2 instances are used to perform common automated configuration tasks and even run scripts after the instance starts. These scripts run as the root user, and can be used to install software or download files from an S3 bucket. You can pass up to 16 KB of data to an instance, either as plain text or base64-encoded. The User Data script is executed only one time when the instance is first launched. If you stop and start the instance, the script does not run again. However, it will run on every boot if the instance reboots.

Visit the following resources to learn more:

- [@official@User Data Scripts EC2](https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/user-data.html)
