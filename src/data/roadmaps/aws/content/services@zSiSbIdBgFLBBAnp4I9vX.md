# Services

AWS ECS Services are defined as a set of part or all of your task definitions that run and maintain a specified number of instances of a task definition simultaneously in an Amazon ECS cluster. If any of your tasks should fail or stop for any reason, the Amazon ECS service scheduler launches another instance of your task definition to replace it and maintain the desired count of tasks, ensuring the service's reliability and availability. ECS services can be scaled manually or with automated scaling policies based on CloudWatch alarms. In addition, ECS service scheduling options define how Amazon ECS places and terminates tasks.

Visit the following resources to learn more:

- [@official@Services in ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html)
