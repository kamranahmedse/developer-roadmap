# Public

In AWS, a "Public Hosted Zone" is set up to route traffic on the internet. This means the DNS namespace of this zone is exposed to the public internet. When you create a "Public Hosted Zone", Amazon Route 53 creates a set of four name servers (also known as delegation set) in that zone. Then, you typically set the corresponding domain's NS records to these Route 53 name servers so that the domain's DNS can be managed in the Route 53 console. These zones include Resources Records Sets, where each record set can include records like A (address), CNAME (canonical name), MX (mail exchange), and so on, which define how the traffic is routed.

Visit the following resources to learn more:

- [@official@Public Hosted Zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/AboutHZWorkingWith.html)
