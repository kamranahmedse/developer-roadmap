# Rolling Updates Rollbacks

Rolling Updates is a deployment strategy in Kubernetes for deploying new versions of an application by gradually updating existing pods with the new version while ensuring that the application remains available throughout the process. Kubernetes allows teams to configure Rolling Updates to update a certain percentage of pods at a time and wait for them to become available before proceeding with the update. In case of any issues, Kubernetes provides a Rollback mechanism, allowing teams to easily revert to the previous version of the application.

Learn more from the following resources:

- [@official@Rolling Back a Deployment - Docs](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)
- [@video@Kubernetes Rolling Update | Rollback Deployment](https://www.youtube.com/watch?v=xRifmrap7S8)
