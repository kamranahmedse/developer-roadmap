You should avoid using **SELECT ***  as much as possible in your production code for the following reasons:

- **Increased IO**: Using **SELECT ***, you can return unnecessary data that leads to increased Input/Output cycles at the database level since you will be reading all the data in a table. This effect will be more impactful on a table with a lot of data and even slow down your query.

- **Increased network traffic**: **SELECT *** returns more data than required to the client, which uses more network bandwidth than needed. The increase in network bandwidth causes data to take longer to reach the client application and impacts the application's performance.

- **More application memory**: The return of a lot of data would make your application require more memory to hold the unnecessary data which might you might not use and this impacts application performance.

- **Makes maintenance more difficult**: Using **SELECT *** makes code maintenance more challenging. If the table structure changes by adding, removing, or renaming columns, the queries using **SELECT *** could break unexpectedly. You should explicitly specify the columns from which you want to fetch data to ensure resilience against potential changes in the database schema. 