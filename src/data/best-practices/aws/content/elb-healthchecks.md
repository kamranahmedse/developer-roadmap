# ELB Healthchecks

> Use ELB health check instead of EC2 health checks.

This is a configuration option when creating your scaling group, you can specify whether to use the standard EC2 checks (is the instance connected to the network), or to use your ELB health check. The ELB health check offers way more flexibility. If your health check fails and the instance gets taken out of the load balancing pool, you're pretty much always going to want to have that instance killed by auto-scaling and a fresh one take it's place. If you don't set up your scaling group to use the ELB checks, then that won't necessarily happen. The [AWS documentation on adding the health check](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-add-elb-healthcheck.html) has all the information you need to set this up.
