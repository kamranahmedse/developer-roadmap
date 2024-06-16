# App Settings and Configurations

In the ASP.NET Core framework, app settings and configurations refer to the process of storing and managing application-specific settings and configuration data.

- **App Settings** refers to the key-value pairs of data that an application uses to configure its behavior, such as database connection strings, api keys, or other settings. These settings are typically stored in configuration files, such as `appsettings.json`, `appsettings.development.json`, or `appsettings.production.json`, and can be accessed using the IConfiguration interface.

- **Configurations** refer to the process of loading and managing the app settings, including specifying the source of the settings and the format of the configuration files. In ASP.NET Core, the `Startup` class is responsible for configuring the application's settings, and typically loads configuration data from various sources, such as JSON files, environment variables, or command-line arguments.

For more information, visit the following links:

- [@article@What is Azure App Configuration?](https://learn.microsoft.com/en-us/azure/azure-app-configuration/overview)
- [@article@What are App Configurations and how do I work with them?](https://support.procore.com/faq/what-are-app-configurations)
- [@article@Configuration & AppSettings](https://docs.servicestack.net/appsettings)
