# Force Content-Type

> Always force the `Content-Type` header to be set to relevant MIME type.

Forcing the content-type for API security is important because it ensures that the client and server are communicating in a mutually agreed-upon format for the data being transmitted. This can prevent attacks such as content spoofing or injection, where an attacker tries to trick the server into processing malicious content by pretending that it is of a different content type. By forcing the content-type to a specific format, the server can validate that the data it is receiving is legitimate and safe to process. Additionally, forcing the content-type can help prevent certain types of parsing errors that could be exploited by attackers.
