There are multiple considerations to have while setting up Continuous Integration and Continuous Delivery pipelines:

- **Using source control** as the trigger for the entire process (git for example). The build pipelines for your backend services should get executed when you push your code into a specific branch.
- **Pick the right CI/CD** platform for your needs, there are many out there such as GitHub Actions, GitLab CI/CD, CircleCI and more.
- Make sure you have **automated unit tests** that can be executed inside these pipelines.
- **Automatic deployment** should happen only if all tests are executed successfully, otherwise, the pipeline should fail, preventing broken code from reaching any environment.
- **Use an artifact repository** such as JFrog Artifactory or Nexus Repository to store successfully built services.
- Finally, consider setting up a **rollback strategy** in case something goes wrong and the final deployed version of your service is corrupted somehow.
