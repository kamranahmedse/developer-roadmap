# Disable Entinty Parsing in XML

> Disable entity parsing if you are parsing XML to avoid XXE attacks

If the XML parser is vulnerable to XXE attacks, the attacker can use this vulnerability to read files on the server, perform SSRF attacks, and more. This can lead to the disclosure of sensitive information, denial of service, and other attacks.

XXE (XML External Entity) attack is a type of attack that targets applications that parse XML input from untrusted sources. In this attack, an attacker injects a malicious XML payload. This payload can contain external entities that the attacker can use to retrieve sensitive data, execute remote code, or launch denial of service attacks. XXE attacks can be prevented by disabling external entity processing or by validating and sanitizing the XML input before parsing it.
