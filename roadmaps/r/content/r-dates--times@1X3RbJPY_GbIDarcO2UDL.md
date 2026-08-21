# R Dates & Times

Base R represents dates and times using specific classes: `Date` for calendar dates and `POSIXct` for date-times that include a time component. These classes let you do arithmetic directly, like subtracting two dates to get the number of days between them. Parsing dates correctly requires knowing the format they were written in, since ambiguous formats can be misread.