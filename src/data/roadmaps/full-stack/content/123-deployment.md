# Deployment

Now that you know the basics of AWS, you should be able to deploy your application to AWS. You don't need to use all the AWS services, here is what you can probably get started with:

- Setup an EC2 instance using any AMI (e.g. latest version of Ubuntu)
- SSH into the EC2 instance using the key pair you created
- Install Node.js on the EC2 instance
- Install Git on the EC2 instance
- Clone your application from GitHub
- Install and configure database on the EC2 instance (e.g. PostgreSQL)
- Make sure that the security group of the EC2 instance allows HTTP and HTTPS traffic
- Try to access your application using the public IP address of the EC2 instance
- Purchase or setup a domain name using Route53 (or any other domain name provider) and point it to the public IP address of the EC2 instance
- Setup HTTPs using [certbot](https://roadmap.sh/guides/setup-and-auto-renew-ssl-certificates)
- And voilla! You have deployed your application to AWS!

If you get stuck, here is a video that shows how to deploy a Node.js application to AWS EC2: 

- [Deploy Node App on AWS EC2](https://youtu.be/oHAQ3TzUTro)
