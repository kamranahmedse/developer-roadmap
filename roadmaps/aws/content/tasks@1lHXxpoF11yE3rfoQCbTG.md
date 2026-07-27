# Tasks

Tasks in Amazon ECS are the instantiation of a task definition within a cluster. They can be thought of as the running instance of the definition, the same way an object is an instance of a class in object-oriented programming. A task definition is a text file in JSON format that describes one or more containers, up to a maximum of 10. The task definition parameters specify the container image to use, the amount of CPU and memory to allocate for each container, and the launch type to use for the task, among other options. When a task is launched, it is scheduled on an available container instance within the cluster.

Visit the following resources to learn more:

- [@official@Tasks in ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)
