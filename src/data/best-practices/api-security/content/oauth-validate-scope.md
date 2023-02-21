# Validate Scope

> Have default scope, and validate scope for each application

In OAuth, scopes are used to specify the permissions and access levels that are granted to client applications when accessing protected resources on behalf of a user.

The best practice of having a default scope and validating the scope for each application is important because it helps to ensure that client applications only have access to the resources that they require, and that users are only granting the necessary permissions to each application.

The default scope is a set of permissions that are granted to all client applications by default, unless otherwise specified by the user. By having a default scope, you can ensure that all applications are subject to the same baseline security and access controls.

In addition to having a default scope, it is also recommended to validate the scope for each application. This means that when a user grants access to an application, the server should check to ensure that the requested scope is valid and appropriate for that application. This can help to prevent malicious applications from requesting excessive permissions or unauthorized access to user data.

By having a default scope and validating the scope for each application, you can help to ensure that the OAuth flow is secure and that client applications are only accessing the resources and permissions that they require.
