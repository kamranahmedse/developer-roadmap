# Pass the Hash

Pass the hash (PtH) is a type of cyber attack that enables an attacker to authenticate to remote systems by using the underlying NTLM or LanMan hash of a user's password, rather than requiring the plaintext password itself. This type of attack exploits the fact that a password hash can be used for authentication instead of the actual password, giving an attacker access to a user's account without the need to crack the password itself. 

## How does Pass the Hash work?

- **Initial compromise**: The attacker first compromises a single workstation or user account on the target network. This can be done via social engineering, phishing, exploiting software vulnerabilities, or other methods.

- **Hash extraction**: Once the attacker gains access to the compromised system, they are able to extract the password hashes of users stored in the system. Tools like Mimikatz, Windows Credential Editor, or PowerShell scripts can be used to obtain these hashes.

- **Lateral movement**: The attacker then leverages the extracted password hashes to access other systems and services within the network. This is done by using the PtH technique to bypass authentication mechanisms and impersonate legitimate users. The attacker continues to search for and collect additional password hashes, looking for privileged account hashes that can grant them further access.

- **Privilege escalation**: The attacker uses the stolen privileged account hashes to gain increased permissions on the network. This can lead to the attacker gaining control over critical systems, allowing them to exfiltrate sensitive data or even create backdoors for future attacks.

## Mitigation Strategies

To defend against pass the hash attacks, organizations should implement a combination of the following measures:

- **Network segmentation**: Divide the network into separate segments, restricting access to sensitive systems and limiting unauthorized lateral movement.
- **Multi-factor authentication (MFA)**: Implement MFA for user accounts, particularly for administrator accounts, to make it more difficult for an attacker to authenticate using stolen hashes.
- **Strong password policies**: Enforce strong, unique passwords to make it harder for attackers to crack hashes or gain unauthorized access.
- **Least privilege principle**: Limit user account privileges and ensure that users only have the permissions necessary for their job roles.
- **Credential Guard**: Use Windows Credential Guard or similar security features on supported operating systems to protect stored credentials and limit the risk of hash extraction.
- **Regular monitoring and auditing**: Continuously monitor and audit user activities, access logs, and system security to detect and prevent unauthorized access or suspicious activity.