Microservices are a software architecture style that allows you to structure your backend applications as a collection of independent services, each one working around a specific business need.

If you’re looking to decompose a monolith into a set of microservices, you have to keep the following points in mind:

- Start by identifying the logical boundaries of your monolith. Its inner logic will tackle multiple responsibilities and types of resources. Find the boundaries between them to understand where one service starts and another one ends.
- Define your services based on the boundaries from the previous point and start decoupling the data needs as well. Either into multiple tables or even individual databases whenever it makes sense.
- Start incrementally refactoring the monolith and extracting the logic required for each individual microservice into its own project.

By the time you’re done, your original monolith should not be needed anymore, and all your microservices will have their own independent deployment pipeline and code repository.