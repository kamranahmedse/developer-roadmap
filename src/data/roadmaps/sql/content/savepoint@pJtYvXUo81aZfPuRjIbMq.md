# SAVEPOINT

A `SAVEPOINT` in SQL is a point within a transaction that can be referenced later. It allows for more granular control over transactions by creating intermediate points to which you can roll back without affecting the entire transaction. This is particularly useful in complex transactions where you might want to undo part of the work without discarding all changes. `SAVEPOINT` enhances transaction management flexibility.

Learn more from the following resources:

- [@article@SQL SAVEPOINT](https://www.ibm.com/docs/pl/informix-servers/12.10?topic=statements-savepoint-statement)
- [@video@DBMS - Save Point](https://www.youtube.com/watch?v=30ldSUkswGM)