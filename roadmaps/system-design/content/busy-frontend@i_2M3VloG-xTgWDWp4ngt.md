# Busy Frontend
 
The busy frontend antipattern happens when resource-intensive tasks that could run in the background are instead performed directly within a user-facing request, making the frontend do more work than necessary. This slows down response times for users and limits how many requests the frontend can handle concurrently. Offloading heavy work to background jobs keeps the frontend responsive.

Visit the following resources to learn more:

- [@article@Busy Front End antipattern](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/busy-front-end/)