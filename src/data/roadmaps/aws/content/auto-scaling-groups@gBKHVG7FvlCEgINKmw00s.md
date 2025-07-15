# Auto-Scaling Groups

"Autoscaling Groups" in AWS, also known as Auto Scaling Groups (ASGs), are the main components used for scaling resources automatically according to your requirements in AWS. They contain a collection of Amazon Elastic Compute Cloud (EC2) instances that are treated as a logical grouping for the purpose of automatic scaling and management. The instances in an ASG are distributed across different availability zones in a region, ensuring a high level of fault tolerance. When defining an ASG, you specify its minimum, maximum, and desired number of EC2 instances. You also have to specify a launch configuration that determines what type of instances should be launched and from which Amazon Machine Image (AMI).

Visit the following resources to learn more:

- [@official@Auto Scaling Groups](https://docs.aws.amazon.com/eks/latest/best-practices/cas.html)
