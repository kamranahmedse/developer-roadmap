# Use VPC

Setting up a VPC seems like a pain at first, but once you get stuck in and play with it, it's surprising easy to set up and get going. It provides all sorts of extra features over EC2 that are well worth the extra time it takes to set up a VPC. First, you can control traffic at the network level using ACLs, you can modify instance size, security groups, etc. without needing to terminate an instance. You can specify egress firewall rules (you cannot control outbound traffic from normal EC2). But the biggest thing is that you have your own private subnet where your instances are completely cut off from everyone else, so it adds an extra layer of protection.

If you're interested in the internals of VPC, I highly recommend watching [A Day in the Life of Billion Packets](http://www.youtube.com/watch?v=Zd5hsL-JNY4) ([Slides](https://www.slideshare.net/AmazonWebServices/a-day-in-the-life-of-a-billion-packets-cpn401-aws-reinvent-2013)).
