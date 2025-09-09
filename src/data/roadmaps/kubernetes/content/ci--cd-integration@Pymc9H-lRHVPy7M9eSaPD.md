# CI/CD Integration

In CI/CD pattern, the build, test, and deployment of applications to Kubernetes are fully automated. The CI pipeline creates the container image, runs tests, and pushes it to a registry. The CD pipeline then updates Kubernetes manifests or Helm charts and applies them to the cluster using tools like Argo CD, Flux, or kubectl. This makes deployments consistent, repeatable, and fast.

Visit the following resources to learn more:

- [@article@Kubernetes CI/CD Pipelines – 8 Best Practices and Tools](https://spacelift.io/blog/kubernetes-ci-cd)
- [@article@8 Kubernetes CI/CD tools every developer should know](https://octopus.com/devops/kubernetes-deployments/kubernetes-ci-cd-tools-for-developers/)