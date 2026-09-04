# Deployment Stamps
 
The deployment stamps pattern deploys multiple independent copies, or stamps, of an application's infrastructure, each serving a subset of users or tenants. This limits the blast radius of a failure to a single stamp rather than the entire user base, and allows scaling by adding more stamps rather than growing one large deployment. It also makes it easier to meet regional or compliance requirements by isolating stamps geographically.

Visit the following resources to learn more:

- [@article@Deployment Stamps pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/deployment-stamp)
- [@article@Deployment Stamps 101](https://blog.devgenius.io/deployment-stamps-101-7c04a6f704a2)