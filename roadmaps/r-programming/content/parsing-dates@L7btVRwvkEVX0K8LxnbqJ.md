# Parsing Dates

Parsing dates handles the extra complexity of date formats, since something like "01/02/2024" could mean different things depending on locale conventions. Getting the format specification right, or using a package like lubridate that guesses common formats automatically, avoids silently misreading dates. This matters especially when working with data from different countries or systems that don't agree on date conventions.

Visit the following resources to learn more:

- [@article@Mastering Date and Time Data in R with lubridate](https://www.r-bloggers.com/2024/09/mastering-date-and-time-data-in-r-with-lubridate/)
- [@article@parse_date: Parse date from any format](https://www.rdocumentation.org/packages/parsedate/versions/1.3.2/topics/parse_date)
- [@video@Lubridate - how to manipulate date and time data in R](https://www.youtube.com/watch?v=g4JF_Ew8qEc)
- [@video@Standardizing and Parsing Dates in R using Lubridate](https://www.youtube.com/watch?v=v5jasYkmwZI)