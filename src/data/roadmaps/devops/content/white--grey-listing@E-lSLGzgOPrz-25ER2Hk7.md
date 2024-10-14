# White Listing vs Grey Listing

Whitelisting involves creating a list of trusted entities (such as IP addresses, email addresses, or applications) that are explicitly allowed to access a system or send messages. Anything not on the whitelist is denied by default. Whitelisting offers a high level of security by limiting access to only known and approved entities, but it can be inflexible and require frequent updates to accommodate legitimate changes. Greylisting is a more flexible approach used primarily in email filtering. When an email is received from an unknown sender, the server temporarily rejects it with a "try again later" response. Legitimate mail servers will retry sending the email after a short delay, while spammers, which often do not retry, are blocked. This method reduces spam by taking advantage of the fact that spammers usually do not follow retry mechanisms. Greylisting can be less intrusive than whitelisting, but it may introduce slight delays in email delivery for first-time senders.

Visit the following resources to learn more:

- [@article@Detailed Introduction to greylisting](https://en.wikipedia.org/wiki/Greylisting_(email))
- [@video@Greylisting](https://www.youtube.com/watch?v=ljtU6I0sIiw)
- [@video@How to Whitelist an Email Address?](https://www.youtube.com/watch?v=NqQIBtY7ySw)
