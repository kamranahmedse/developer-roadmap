---
title: "Guide to Let's Encrypt SSL Setup"
description: "Learn how to protect your website using Let's Encrypt SSL Certificates."
authorId: 'kamran'
seo:
  title: "Guide to Let's Encrypt SSL Setup - roadmap.sh"
  description: "Learn how to protect your website using Let's Encrypt SSL Certificates."
isNew: false
type: 'textual'
date: 2023-03-13
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'textual-guide'
  - 'guide-sitemap'
---

In this tutorial, I will guide you on creating a free Let's Encrypt SSL certificate for your website that gets automatically renewed. This process requires minimal to no configuration on your part. Let's get started!

First and foremost, you need to have a remote server where your web application is deployed. You might have Nginx, Apache, or any other web server. This tutorial will be specific to Nginx or Apache; if you are using another web server, you can go to [certbot documentation](https://certbot.eff.org/instructions) and get specific instructions for your platform.

## Installation

We need to install `snapd`, which is the package manager that will allow us to install `certbot` from Let's Encrypt for automatic renewal. Run the following commands in your terminal.

```shell
sudo apt-get update
sudo apt-get install snapd

sudo snap install core; snap refresh core
```

Now that `snapd` is installed, we can install `certbot` which we will be using to obtain and install the SSL certificate.

```shell
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Run the following command to verify that `certbot` is installed.

```shell
certbot --version
```

## Getting the SSL Certificate

Now that `certbot` is installed, we need to obtain an SSL certificate. The command will ask you for your email address and the domain name for which you want to obtain the SSL certificate. You can also specify multiple domain names if you want to secure multiple domains with a single certificate.

You can either run the following command for the interactive mode where you will be asked several questions to obtain the SSL certificate.

```shell
# Replace --nginx with --apache if you are using Apache
sudo certbot --nginx
```

You will be asked to enter your email address and agree to the terms of service. You will also be asked to enter the domain name for which you want to obtain the SSL certificate. You can also specify multiple domain names if you want to secure multiple domains with a single certificate.

Alternatively, you can run the following command to obtain the SSL certificate in a non-interactive mode where you will not be asked any questions. This is useful if you want to automate the process.

```shell
sudo certbot --apache \
  --agree-tos \
  -m you@email.com \
  --no-eff-email \
  --redirect \
  --domains news.roadmap.sh
```

This command will obtain an SSL certificate for the specified domain name, install it for you, and redirect HTTP traffic to HTTPS. The SSL certificate is valid for three months, after which it will expire.

## Auto-Renewal of SSL Certificate

SSL certificate generated using certbot is valid for 3 months; after which you need to renew the certificate. Certbot automatically sets up the renewal for you so you don't have to worry about.

For the renewal to work, you need to have a cronjob or a systemd timer set up. To check if the automatic renewal is active, you can use one of two methods:

- Check cronjob to see if there is a certbot renewal cron job registered by running the following command:

  ```shell
  sudo crontab -l
  ```

- If you don't find the cron job registered, check the systemd timer by running the following command.

  ```shell
  sudo systemctl list-timers
  ```

  There should be a line that includes `certbot.timer`. This timer is configured to run twice daily—once in the morning and once in the evening—to automatically renew the SSL certificate near expiration.

Alright, so once you have verified that the auto-renewal timer is set up, let's verify that the actual auto-renewal is working. Let's do that next.

## Testing if Auto-Renewal is Working

To test if the auto-renewal is working, you can run the following command provided by certbot to dry-run the renewal process.

```shell
sudo certbot renew --dry-run
```

This will not renew the certificate but will show you the output of the renewal process.

## Conclusion

Try visiting your website using HTTPS and you should see a lock icon showing that the connection is secure. Also, upon visiting the HTTP version of your website, you should be redirected to the HTTPS version.

That's it! You have successfully obtained and installed a Let's Encrypt SSL certificate on your web server. You have also set up the auto-renewal so that you don't have to worry about renewing it manually.
