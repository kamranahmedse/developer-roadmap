**CI/CD Pipelines** automate the build, test, and deployment of any project. These pipelines are a critical part of any successful development process.

##### Continuous Integration (CI):
In this step you automatically build and test the code whenever changes are pushed to a repository. The usual tools for the job are Jenkins, GitHub Actions, CircleCI and other similar alternatives.

##### Continuous Delivery (CD):
During this phase, the actual deployment of the product is automated, so that once the code is verified in the CI stage, it can automatically be promoted into the right environment.

##### Steps in a Pipeline:
The steps involved in the full process are:

Pull code → Build app → Run tests → Deploy artifact → Notify team

And all of them are done automatically one after the other, breaking the chain if there is a failure in one of them.

##### Most common tools used:
1. **Jenkins**: Highly customizable for complex workflows.  
2. **GitHub Actions**: Easy integration with GitHub repositories.  
3. **Docker**: For containerized builds.  
4. **ArgoCD** or **Spinnaker**: For Kubernetes deployments. 