# Scheduled Workflows
 
Scheduled workflows run automatically at specified times using cron syntax under the `schedule` trigger in a workflow file. This is useful for recurring tasks like nightly builds, periodic cleanup jobs, or fetching data on a regular interval. GitHub runs scheduled workflows based on UTC time, and there can be a slight delay depending on runner availability.

Visit the following resources to learn more:

- [@official@Events that trigger workflows - Schedule](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule)
- [@video@GitHub Actions - How to Schedule workflows in GitHub](https://www.youtube.com/watch?v=StipNrK__Gk)