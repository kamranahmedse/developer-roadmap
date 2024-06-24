# Twelve-Factor Apps

The Twelve-Factor App is a methodology for building scalable and maintainable software-as-a-service (SaaS) applications. It is based on a set of best practices that were identified by the authors of the methodology as being essential for building modern, cloud-native applications.

The Twelve-Factor App methodology consists of the following principles:

- Codebase: There should be a single codebase for the application, with multiple deployments.
- Dependencies: The application should explicitly declare and isolate its dependencies.
- Config: The application should store configuration in the environment.
- Backing services: The application should treat backing services as attached resources.
- Build, release, run: The application should be built, released, and run as an isolated unit.
- Processes: The application should be executed as one or more stateless processes.
- Port binding: The application should expose its services through port binding.
- Concurrency: The application should scale out by adding more processes, not by adding threads.
- Disposability: The application should be designed to start and stop quickly.
- Dev/prod parity: The development, staging, and production environments should be as similar as possible.
- Logs: The application should treat logs as event streams.
- Admin processes: The application should run admin/maintenance tasks as one-off processes.

The Twelve-Factor App methodology is widely adopted by developers of SaaS applications, and it is seen as a best practice for building cloud-native applications that are scalable, maintainable, and easy to deploy.

Visit the following resources to learn more:

- [@article@The Twelve-Factor App](https://12factor.net/)
