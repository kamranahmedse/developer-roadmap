---
title: 'Basics of Authentication'
description: 'Learn the basics of Authentication and Authorization'
authorId: 'kamran'
seo:
  title: 'Basics of Authentication - roadmap.sh'
  description: 'Learn the basics of Authentication and Authorization'
isNew: false
type: 'textual'
date: 2022-09-21
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'textual-guide'
  - 'guide-sitemap'
---

Our last video series was about data structures. We looked at the most common data structures, their use cases, pros and cons, and the different operations you could perform on each data structure.

Today, we are kicking off a similar series for Authentication strategies where we will discuss everything you need to know about authentication and authentication strategies.

In this guide today will be talking about what authentication is, and we will cover some terminology that will help us later in the series. You can watch the video below or continue reading this guide.

<iframe class="w-full aspect-video mb-5" src="https://www.youtube.com/embed/Mcyt9SrZT6g" title="Basics of Authentication"></iframe>

## What is Authentication?

Authentication is the process of verifying someone's identity. A real-world example of that would be when you board a plane, the airline worker checks your passport to verify your identity, so the airport worker authenticates you.

If we talk about computers, when you log in to any website, you usually authenticate yourself by entering your username and password, which is then checked by the website to ensure that you are who you claim to be. There are two things you should keep in mind:

- Authentication is not only for the persons
- And username and password are not the only way to authenticate.

Some other examples are:

- When you open a website in the browser. If the website uses HTTP, TLS is used to authenticate the server and avoid the fake loading of websites.

- There might be server-to-server communication on the website. The server may need to authenticate the incoming request to avoid malicious usage.

## How does Authentication Work?

On a high level, we have the following factors used for authentication.

- **Username and Password**
- **Security Codes, Pin Codes, or Security Questions** — An example would be the pin code you enter at an ATM to withdraw cash.
- **Hard Tokens and Soft Tokens** — Hard tokens are the special hardware devices that you attach to your device to authenticate yourself. Soft tokens, unlike hard tokens, don't have any authentication-specific device; we must verify the possession of a device that was used to set up the identity. For example, you may receive an OTP to log in to your account on a website.
- **Biometric Authentication** — In biometric authentication, we authenticate using biometrics such as iris, facial, or voice recognition.

We can categorize the factors above into three different types.

- Username / Password and Security codes rely on the person's knowledge: we can group them under the **Knowledge Factor**.

- In hard and soft tokens, we authenticate by checking the possession of hardware, so this would be a **Possession Factor**.

- And in biometrics, we test the person's inherent qualities, i.e., iris, face, or voice, so this would be a **Qualities** factor.

This brings us to our next topic: Multi-factor Authentication and Two-Factor Authentication.

## Multifactor Authentication

Multifactor authentication is the type of authentication in which we rely on more than one factor to authenticate a user.

For example, if we pick up username/password from the **knowledge factor**. And we pick soft tokens from the **possession factor**, and we say that for a user to authenticate, they must enter their credentials and an OTP, which will be sent to their mobile phone, so this would be an example of multifactor authentication.

In multifactor authentication, since we rely on more than one factor, this way of authentication is much more secure than single-factor authentication.

One important thing to note here is that the factors you pick for authentication, they must differ. So, for example, if we pick up a username/password and security question or security codes, it is still not true multifactor authentication because we still rely on the knowledge factor. The factors have to be different from each other.

### Two-Factor Authentication

Two-factor authentication is similar to multifactor authentication. The only difference is that there are precisely two factors in 2FA. In MFA, we can have 2, 3, 4, or any authentication factors; 2FA has exactly two factors. We can say that 2FA is always MFA, because there are more than one factors. MFA is not always 2FA because there may be more than two factors involved.

Next we have the difference between authentication and authorization. This comes up a lot in the interviews, and beginners often confuse them.

### What is Authentication

Authentication is the process of verifying the identity. For example, when you enter your credentials at a login screen, the application here identifies you through your credentials. So this is what the authentication is, the process of verifying the identity.

In case of an authentication failure, for example, if you enter an invalid username and password, the HTTP response code is "Unauthorized" 401.

### What is Authorization

Authorization is the process of checking permission. Once the user has logged in, i.e., the user has been authenticated, the process of reviewing the permission to see if the user can perform the relevant operation or not is called authorization.

And in case of authorization failure, i.e., if the user tries to perform an operation they are not allowed to perform, the HTTP response code is forbidden 403.

## Authentication Strategies

Given below is the list of common authentication strategies:

- Basics of Authentication
- Session Based Authentication
- Token-Based Authentication
- JWT Authentication
- OAuth - Open Authorization
- Single Sign On (SSO)

In this series of illustrated videos and textual guides, we will be going through each of the strategies discussing what they are, how they are implemented, the pros and cons and so on.

So stay tuned, and I will see you in the next one.
