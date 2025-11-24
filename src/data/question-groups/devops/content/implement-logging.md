Logging for a distributed system is definitely not a trivial problem to solve. While the actual implementation might change based on your particular tech stack, the main aspects to consider are:

- Keep the structure of all logs consistent and the same throughout your platform. This will ensure that whenever you want to explore them in search for details, you’ll be able to quickly move from one to the other without having to change anything.
- Centralize them somewhere. It can be an ELK stack, it can be Splunk or any of the many solutions available out there. Just make sure you centralize all your logs so that you can easily interact with all of them when required.
- Add unique IDs to each request that gets logged, that way you can trace the flow of data from service to service. Otherwise, debugging problems becomes a real issue.
- Add a tool that helps you search, query, and visualize the logs. After all, that’s why you want to keep track of that information, to use it somehow. Find yourself a UI that works for you and use it to explore your logs.
