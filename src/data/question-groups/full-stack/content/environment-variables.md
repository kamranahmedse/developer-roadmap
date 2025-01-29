Environment variables store configuration values (e.g., API keys, database URLs) outside the codebase. This is important for two main reasons:

1. **Security**. By extracting these values (which tend to be private) from the codebase, you avoid potential code leaks from becoming a bigger security problem.  
2. **More flexible deployments**. If these values need to change, by having them as environment variables you don’t need to re-deploy your code, you just need to reload those values (either by restarting the app, or hot reloading the values from a file).

For the actual implementation, one might use something like the `dotenv` module, which loads environment variables from a .env file in the local folder of the project, or interact with a secret manager, such as **AWS Secret Manager** which stores these values externally in a secure storage.