# CI / CD

CI/CD is an acronym for Continuous Integration / Continuous Deployment.

### Continuous Integration
---

Whenever you as a developer write a piece of code that is going to be integrated into a larger project, it is important to check if it will break anything in the existing system. A CI system will create a temporary environment(in most cases using docker containers) that will do the following things:
 * Do bare minimum setup to run the automated tests.
 * Pull the target branch of the repository.
 * Merge your PR locally into the target branch.
 * Run the automated tests.
 * Show pass/fail results along with the run logs.

This way the administrator/reviewer of the repository can see the results without having to manually test if merging your PR is good. However, this is fully based on the test coverage of the project itself.


### Continuous Deployment
---

Now that the admin knows that your PR is good to go. He should not be waiting to raise a formal deployment request to a dedicated deployment team, in most cases there won't be anyone solely for deploying changes every day or every hour. To our rescue comes the CD system which takes responsibility for doing the following things:
 * Set up a connection with the server.
 * Navigate to the correct repository.
 * Take a code backup and do pre-deployment rituals.
 * Stop the running server.
 * Pull the target branch, it can be master for production, staging for quality test, etc.
 * Perform any setup or database modifications if needed.
 * Restart the server and do any cleanup if needed.
 * Run some heartbeat checks to ensure the server is up and running.
 * Inform the stakeholders via email, slack, etc.

Almost all major providers come with their custom solutions for CI/CD as GitHub actions, GitLab CICD, Bitbucket pipelines, etc. Along with the default offerings, many known third-party solutions are available as CircleCI, Jenkins, etc.


<ResourceGroupTitle>Learn more</ResourceGroupTitle>
<BadgeLink badgeText='CI/CD explanation from semaphore' href='https://semaphoreci.com/cicd'>CI/CD: Continuous Integration & Delivery Explained</BadgeLink>
<BadgeLink badgeText='CI/CD explanation from redhat' href='https://www.redhat.com/en/topics/devops/what-is-ci-cd'>What is CI/CD?</BadgeLink>
