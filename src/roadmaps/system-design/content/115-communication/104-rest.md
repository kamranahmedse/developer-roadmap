# REST

REST is an architectural style enforcing a client/server model where the client acts on a set of resources managed by the server. The server provides a representation of resources and actions that can either manipulate or get a new representation of resources. All communication must be stateless and cacheable.

There are four qualities of a RESTful interface:

- Identify resources (URI in HTTP) - use the same URI regardless of any operation.
- Change with representations (Verbs in HTTP) - use verbs, headers, and body.
- Self-descriptive error message (status response in HTTP) - Use status codes, don't reinvent the wheel.
- HATEOAS (HTML interface for HTTP) - your web service should be fully accessible in a browser.

To learn more, visit the following links:

- [What Is REST?](https://github.com/donnemartin/system-design-primer#REST)
- [What are the drawbacks of using RESTful APIs?](https://www.quora.com/What-are-the-drawbacks-of-using-RESTful-APIs)