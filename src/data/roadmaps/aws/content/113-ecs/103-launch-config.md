# Launch Config / Autoscaling Groups

`Launch Configuration` is a template that an Auto Scaling group uses to launch EC2 instances. When you create a launch configuration, you specify information for the instances such as the ID of the Amazon Machine Image (AMI), the instance type, a key pair, one or more security groups, and a block device mapping. If you've launched an instance before, you can specify the same parameters for your launch configuration. Any parameters that you don't specify are automatically filled in with the default values that are set by the launch wizard.

Visit the following resources to learn more:

- [@official@Launch Config in EC2](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html)
