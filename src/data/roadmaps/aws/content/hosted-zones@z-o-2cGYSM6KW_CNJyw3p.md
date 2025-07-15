# Hosted Zones

A **Hosted Zone** in AWS Route 53 is essentially a container that holds information about how you want to route traffic on the internet for a specific domain, such as example.com. Each hosted zone is associated with a set of DNS records, which control the flow of traffic for that domain. AWS Route 53 automatically creates a record set that includes a name server (NS) record and a start of authority (SOA) record when you create a hosted zone. These records provide necessary information about your domain to the DNS system, establishing the basis for routing traffic for that domain to the appropriate IP address in your AWS environment.

Visit the following resources to learn more:

- [@official@Hosted Zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html)
