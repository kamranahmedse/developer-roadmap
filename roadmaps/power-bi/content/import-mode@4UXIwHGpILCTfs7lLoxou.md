# Import Mode

Import mode loads a copy of the source data into Power BI's own compressed in-memory storage, called VertiPaq. Once imported, report visuals query this local copy, which makes interactions fast regardless of the original source's speed. The trade-off is that data is only as current as the last scheduled or manual refresh.

Visit the following resources to learn more:

- [@official@Import Mode](https://learn.microsoft.com/en-us/power-bi/connect-data/service-dataset-modes-understand#import-mode)
- [@video@Import vs DirectQuery in Power BI](https://www.youtube.com/watch?v=tDIsCVB7mnI)