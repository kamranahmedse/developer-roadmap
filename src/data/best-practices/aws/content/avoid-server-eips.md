# Avoid Server EIPs

> Don't give servers static/elastic IPs.

For a typical web application, you should put things behind a load balancer, and balance them between AZs. There are a few cases where Elastic IPs will probably need to be used, but in order to make best use of auto-scaling you'll want to use a load balancer instad of giving every instance their own unique IP.