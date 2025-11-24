HTTP is, by design, a stateless protocol, which means that every request is unique and unrelated to any previous request, even from the same client.

This affects backend web services by forcing them to implement their own state management solutions if such a feature is required.