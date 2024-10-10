# SMTP

Email is emerging as one of the most valuable services on the internet today. Most internet systems use SMTP as a method to transfer mail from one user to another. SMTP is a push protocol and is used to send the mail whereas POP (post office protocol) or IMAP (internet message access protocol) are used to retrieve those emails at the receiver’s side. SMTP is an application layer protocol. The client who wants to send the mail opens a TCP connection to the SMTP server and then sends the mail across the connection. The SMTP server is an always-on listening mode. As soon as it listens for a TCP connection from any client, the SMTP process initiates a connection through port 25. After successfully establishing a TCP connection the client process sends the mail instantly.

Visit the following resources to learn more:

- [@article@What is SMTP? - Cloudflare](https://www.cloudflare.com/learning/email-security/what-is-smtp)
- [@article@SMTP - Wikipedia](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)
- [@video@What is SMTP and how does it work?](https://www.youtube.com/watch?v=iUhDT3ZtWS0)
- [@feed@Explore top posts about Serverless](https://app.daily.dev/tags/serverless?ref=roadmapsh)
