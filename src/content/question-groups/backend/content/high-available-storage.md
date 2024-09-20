Building a highly available data storage involves multiple areas, including:

- **Multi-zone environments.** If you’re going with cloud-based solutions (such as Azure, AWS, GCP or others) then you’re likely to have this requirement met instantly (except for some specific regions in the world). This is to ensure availability even during partial network outages.
- **Data replication.** Ensure your data is being replicated between servers of all zones. This is to ensure that if there is a failure taking some servers down (or even entire zones) there is no data loss.
- **Load balancing.** Ensure the traffic is properly load-balanced between all your availability zones to ensure the lowest latency for all your clients.
- And then there are other requirements like setting up a proper data governance policy to ensure data access is regulated, as well as fully complying with your local data regulations (like GDPR).