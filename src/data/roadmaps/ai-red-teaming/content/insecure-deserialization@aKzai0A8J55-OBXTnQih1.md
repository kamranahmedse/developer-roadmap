# Insecure Deserialization

(AI Red Teamers investigate if serialized objects used by the AI system (e.g., for saving model states, configurations, or transmitting data) can be manipulated by an attacker. They test if crafting malicious serialized objects could lead to remote code execution or other exploits when the application deserializes the untrusted data.)

Learn more from the following resources:

- [@article@Lightboard Lessons: OWASP Top 10 - Insecure Deserialization - DevCentral](https://community.f5.com/kb/technicalarticles/lightboard-lessons-owasp-top-10---insecure-deserialization/281509) - Video explanation.
- [@article@How Hugging Face Was Ethically Hacked](https://www.aiblade.net/p/how-hugging-face-was-ethically-hacked) - Hugging Face deserialization case study.
- [@article@OWASP TOP 10: Insecure Deserialization - Detectify Blog](https://blog.detectify.com/best-practices/owasp-top-10-insecure-deserialization/) - Overview within OWASP Top 10 context.
- [@guide@Insecure Deserialization - OWASP Foundation](https://owasp.org/www-community/vulnerabilities/Insecure_Deserialization) - Core explanation of the vulnerability.
