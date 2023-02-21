# Proper Response Code

> Return the proper status code according to the operation completed. e.g.
> - `200 OK`
> - `400 Bad Request`
> - `401 Unauthorized`
> - `405 Method Not Allowed`
> - ...etc.

Returning the proper status code according to the operation completed is important for API security because it allows the client to understand the outcome of their request and take appropriate actions. For example, if the server returns a 401 Unauthorized status code, the client knows that their authentication credentials are incorrect and can prompt the user to re-enter their login details. On the other hand, if the server returns a 200 OK status code even though the request failed, the client may not realize there was an issue and could potentially execute malicious actions or display incorrect data. Providing accurate status codes can help prevent security vulnerabilities and improve the overall reliability and usability of the API.