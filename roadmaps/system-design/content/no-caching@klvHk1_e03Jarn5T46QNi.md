# No Caching
 
The no caching antipattern refers to an application that repeatedly performs expensive operations, like database queries or external API calls, without caching results that could be reused. This creates unnecessary load and latency for data that does not change often. Adding an appropriate caching layer can significantly reduce this overhead.

Visit the following resources to learn more:

- [@article@No Caching antipattern](https://learn.microsoft.com/en-us/azure/architecture/antipatterns/no-caching/)