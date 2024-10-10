# Domain Keys

DomainKeys is an email authentication method designed to verify the domain of an email sender and ensure message integrity. Developed by Yahoo, it was a precursor to DKIM (DomainKeys Identified Mail). DomainKeys uses public key cryptography to allow email systems to verify that a message was sent by an authorized sender and hasn't been tampered with in transit. The sending server signs outgoing emails with a private key, and receiving servers can verify the signature using a public key published in the sender's DNS records. While largely superseded by DKIM, DomainKeys played a crucial role in the evolution of email authentication techniques aimed at combating email spoofing and phishing attacks.

Visit the following resources to learn more:

- [@article@DomainKeys Identified Mail](https://www.brainkart.com/article/DomainKeys-Identified-Mail_8493/)
- [@video@What is DKIM? DomainKeys Identified Mail](https://www.youtube.com/watch?v=IBhO0akhMlQ)
