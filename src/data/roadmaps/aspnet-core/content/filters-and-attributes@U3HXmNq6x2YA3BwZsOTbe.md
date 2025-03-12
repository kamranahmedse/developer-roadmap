# Filters and Attributes

In the ASP.NET Core framework, filters and attributes are used to add additional functionality to controllers and action methods, such as authentication, authorization, caching, and exception handling.

- **Filters** are classes that implement one or more of the filter interfaces provided by the framework, such as `IActionFilter`, `IResultFilter`, `IExceptionFilter`, and `IAuthorizationFilter`. Filters can be applied to controllers, action methods, or globally to the entire application. They can be used to perform tasks such as logging, caching, and handling exceptions.

- **Attributes** are classes that derive from `Attribute` class, and are used to decorate controllers, action methods, or properties with additional metadata. For example, the Authorize attribute can be used to require that a user is authenticated before accessing a specific action method, and the `ValidateAntiForgeryToken` attribute can be used to protect against cross-site request forgery (CSRF) attacks.

- [@article@Filters](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-7.0)