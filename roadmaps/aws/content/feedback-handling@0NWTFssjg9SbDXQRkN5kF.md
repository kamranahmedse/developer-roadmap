# Feedback Handling

AWS Simple Email Service (SES) provides a mechanism for handling bounces, complaints, and delivery notifications. This mechanism is called feedback handling. Bounces occur when an email can't be delivered to a recipient. Complaints happen when a recipient marks an email as spam. Delivery notifications are sent when Amazon SES successfully delivers an email to a recipient's mail server. AWS SES enables you to receive these feedback notifications by email, relayed to an Amazon SNS topic, or through Amazon CloudWatch. The process of deciding on what action to take when your emails bounce or are marked as spam is called feedback handling. AWS SES automatically handles all feedback loop (FBL) complaints for you, but when it comes to bounces, you are given the flexibility to choose how you want your system to respond.

Visit the following resources to learn more:

- [@official@Feedbacks](https://aws.amazon.com/ses/faqs)
