# Lock Security Groups

> Lock down your security groups.

Don't use `0.0.0.0/0` if you can help it, make sure to use specific rules to restrict access to your instances. For example, if your instances are behind an ELB, you should set your security groups to only allow traffic from the ELBs, rather than from `0.0.0.0/0`. You can do that by entering "amazon-elb/amazon-elb-sg" as the CIDR (it should auto-complete for you). If you need to allow some of your other instances access to certain ports, don't use their IP, but specify their security group identifier instead (just start typing "sg-" and it should auto-complete for you).
