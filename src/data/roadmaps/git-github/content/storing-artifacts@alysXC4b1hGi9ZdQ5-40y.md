# Storing Artifacts
 
Artifacts are files produced during a workflow run, like build outputs or test reports, that can be saved and downloaded after the workflow finishes. The `actions/upload-artifact` action stores these files, and `actions/download-artifact` retrieves them in a later job or for manual inspection. Artifacts are commonly used to pass build outputs between jobs or to keep logs and reports for review.

Visit the following resources to learn more:

- [@official@Storing and sharing data from a workflow](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow)