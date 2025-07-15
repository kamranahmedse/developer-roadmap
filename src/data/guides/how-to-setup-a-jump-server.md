---
title: 'Jump Servers: What, Why and How'
description: 'Learn what is a Jump Server and how to set it up for SSH access.'
authorId: 'kamran'
seo:
  title: 'Jump Servers: What, Why and How - roadmap.sh'
  description: 'Learn what is a Jump Server and how to set it up for SSH access.'
isNew: false
type: 'textual'
date: 2023-03-20
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'visual-guide'
  - 'guide-sitemap'
---

Given below is the demonstration of a sample production environment for a web application that consists of two different components, application server and database server.

![Private Network](https://i.imgur.com/nBJDuVO.png)

Application server has both a public and private IP address. It is accessible from the internet. Database server has only a private IP address and is accessible only from the application server.

It is a common practice to have this setup due to security reasons. This is done to prevent unauthorized access to the database server.

## What is a Jump Server?

A jump server is a server that is used to access other servers. It is also known as a bastion host. It is a server that is accessible from the internet and is used to access other servers that are not accessible from the internet.

In the above example, the application server is called the jump server.

For example, you might have this infrastructure on AWS, where you have a custom VPC with two subnets.

- **Public Subnet:** Outside world can access
- **Private Subnet:** Only accessible from within the VPC

Let's say that the application server is in the public subnet and the database server is in the private subnet.

> If you want to learn more about AWS VPC, check out this [detailed guide about AWS VPC](https://cs.fyi/guide/up-and-running-with-aws-vpc), Subnets and everything else you need to know about AWS VPC.
> Also, have a look at [this guide on AWS EC2 instances](https://cs.fyi/guide/up-and-running-with-aws-ec2) which covers all the important concepts about EC2 instances and how to launch them.

We can easily SSH into the application server from the internet i.e.

```bash
ssh -i ~/.ssh/mykey.pem ec2-user@3.112.5.67
```

But the database server doesn't have a public IP address. So, we can't SSH into it from the internet. For example, following won't work

```bash
# Won't work because the IP address is private
ssh -i ~/.ssh/mykey.pem ec2-user@192.168.1.0
```

Now if we have to SSH into the database server, we have to first SSH into the application server and then SSH into the database server from there. Because the application server, being in the same VPC, can access the database server.

## Let's try it Out

Let's first SSH into the application server:

```bash
ssh -i ~/.ssh/mykey.pem ec2-user@3.112.5.67
```

Once we are inside the application server, let's try to SSH into the database server:

```bash
ssh -i ~/.ssh/mykey.pem ec2-user@192.168.1.0
```

We have an error:

```
Warning: Identity file /home/ubuntu/.ssh/mykey.pem not accessible: No such file or directory.
ubuntu@192.168.1.0: Permission denied (publickey).
```

What happened? The reason is that the private key is not present on the application server i.e. `~/.ssh/mykey.pem`. Now, there are two ways to solve this problem.

### Solution 1 - Copy the Private Key to Server

We can copy the private key from our local machine to the application server and use it there to access the database server. You can do that by running the following command on your local machine:

```bash
scp -i path/to/key.pem examplefile yourusername@yourserver:/home/yourusername/
```

i.e. in our case it will be

```bash
scp -i ~/.ssh/mykey.pem ~/.ssh/mykey.pem ec2-user@3.112.5.67:/home/ubuntu/
#   --------^---------- -------^-------- ----^--- ----^----- ----^--------
#      key file path      file to copy     user      host    path to copy
```

Now we can SSH into the application server and use the private key copied at `/home/ubuntu/mykey.pem` to access the database server.

The issue with this solution is that if our application server is compromised, the attacker will have access to our private key and can access the database server.

### Solution 2 - Use SSH Agent Forwarding

The second solution is to use SSH agent forwarding. SSH agent forwarding is a technique that allows you to access a server that is not accessible from the internet. Follow these steps to set up the SSH agent forwarding:

Add the private key (.pem file) that we use to connect to the application server to our local SSH agen:

```bash
ssh-add ~/.ssh/mykey.pem
```

Now if you run `ssh-add -l` you will see the key added to the agent:

```
2048 SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx path/to/key.pem (RSA)
```

Now let's SSH into the application server using the following command

```bash
ssh -A -i ~/.ssh/mykey.pem ec2-user@3.112.5.67
#  ^^^ -A flag is used to enable agent forwarding
```

Once you have SSHed into the application server, you can SSH into the database server simply by using the following command:

```bash
ssh ec2-user@192.168.1.0
```

Voila! You have successfully SSHed into the database server from the application server.

#### Summarized Steps

```bash
# Add the private key to the local SSH agent
ssh-add ~/.ssh/mykey.pem

# SSH into the application server using the private key
ssh -A -i ~/.ssh/mykey.pem ec2-user@3.112.5.67
# you don't need to specify the private key here because it is already added to the SSH agent, so you can simply use the following command
ssh -A ec2-user@3.112.5.67

# SSH into the database server from the application server
ssh ec2-user@192.168.1.0
```

Now, we can even have a single command to SSH into the database server without first having to SSH int the application server. We can do that by using the `-J` flag which is used to specify the jump server.

```bash
ssh -A -J ec2-user@3.112.5.67 ec2-user@192.168.1.0
#         -------^----------- --------^-----------
#            jump server          destination
```

#### Simplifying the SSH Command

We can simplify this even further by adding these host entries to our `~/.ssh/config` file. Open the file in your favorite text editor and add the following lines:

```bash
Host app
  HostName 3.112.5.67
  User ec2-user
  Port 22
  IdentityFile /Users/yourusername/.ssh/mykey.pem
  ForwardAgent yes

Host db
  HostName 192.168.1.0
  User ec2-user
  Port 22
  ProxyJump app
```

Now we can SSH into the application or database server simply by running the following commands on your local machine:

```bash
# SSH into the application server
ssh app

# SSH into the database server
ssh db
```

## Conclusion

In this article, we learned about the jump server and how to use SSH agent forwarding to access a server that is not accessible from the internet. We also learned how to simplify the SSH command by adding host entries to the `~/.ssh/config` file.
