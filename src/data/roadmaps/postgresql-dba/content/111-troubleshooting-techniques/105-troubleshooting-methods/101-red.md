# Troubleshooting Methods: Analyzing 'red' Situations

The acronym stands for Rate, Errors, and Duration. These are request-scoped, not resource-scoped as the USE method is. Duration is explicitly taken to mean distributions, not averages.

The Rate is the number of requests per second. The Errors is the number of requests that failed. The Duration is the distribution of request durations.

The Red Method is a methodology for analyzing the performance of any system. It directs the construction of a checklist, which for server analysis can be used for quickly identifying resource bottlenecks or errors. It begins by posing questions, and then seeks answers, instead of beginning with given metrics (partial answers) and trying to work backwards.

Have a look at the following article for more information on the Red Method: [USE and RED Method](https://orangematter.solarwinds.com/2017/10/05/monitoring-and-observability-with-use-and-red/).