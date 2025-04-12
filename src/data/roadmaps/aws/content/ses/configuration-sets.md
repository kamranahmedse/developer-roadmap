# Configuration Sets

Configuration Sets in SES (Simple Email Service) of AWS (Amazon Web Services) allow to publish email sending events. These sets are used to group together similar rules that you can apply to emails you send using AWS SES. You can apply a configuration set to an email by including it in the headers of the email. It can be used to specify the dedicated sending IP pools, configure the message delivery parameters, and to enable open and click tracking. AWS SES sends information about each email sent with the set to CloudWatch and Kinesis Firehose which can be later utilized for further analysis or to manage your customer interactions more effectively.

Visit the following resources to learn more:

- [@official@SES](https://docs.aws.amazon.com/ses/latest/dg/using-configuration-sets.html)
