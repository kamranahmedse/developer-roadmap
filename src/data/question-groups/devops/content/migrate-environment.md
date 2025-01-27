To migrate an existing application into a containerized environment, you’ll need to adapt the following steps to your particular context:

1. Figure out what parts of the application need to be containerized together.
2. Create your Dockerfiles and define the entire architecture in that configuration, including the interservice dependencies that there might be.
3. Figure out if you also need to containerize any external dependency, such as a database. If you do, add that to the Dockerfile.
4. Build the actual Docker image.
5. Once you make sure it runs locally, configure the orchestration tool you use to manage the containers.
6. You’re now ready to deploy to production, however, make sure you keep monitoring and alerting on any problem shortly after the deployment in case you need to roll back.
