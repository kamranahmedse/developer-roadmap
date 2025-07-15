# Manual Mapping

Manual object mapping in ASP.NET Core means explicitly assigning values from one object to another without using third-party libraries like AutoMapper. This approach gives you full control over how properties are mapped and allows for custom transformations if needed. 

For instance, if an **Employee** entity has properties such as Id, Name, Email, and Department, and we need to convert it into an **EmployeeDTO** without exposing sensitive data like Id, a manual mapping method can selectively map only the necessary fields. However, it comes with trade-offs, such as increased boilerplate code and the need for manual updates whenever the data model changes. In a real-world ASP.NET Core application, manual mapping can be implemented using static helper methods or extension methods that take an entity as input and return a DTO, ensuring that the mapping logic remains centralized and reusable across different parts of the application.

To learn more, visit the following resources:

- [@article@Manual vs Automapping in ASP.NET?](https://medium.com/@anderson.buenogod/manual-vs-automated-mapping-in-c-which-approach-is-best-for-your-project-50de1fd73bfa)
