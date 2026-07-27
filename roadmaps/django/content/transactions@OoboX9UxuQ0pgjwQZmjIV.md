# Transactions

Transactions are a way to group a series of database operations into a single unit of work. This means that either all the operations within the transaction succeed, or none of them do. If any operation fails, the database rolls back to its previous state, ensuring data consistency and integrity. This is particularly useful when performing multiple related database updates, where a failure in one update could leave the database in an inconsistent state.

Visit the following resources to learn more:

- [@official@Database transactions](https://docs.djangoproject.com/en/6.0/topics/db/transactions/)
- [@article@Understanding Django’s Transaction Atomic](https://plainenglish.io/blog/understanding-djangos-transaction-atomic)
- [@article@Python: How Django Transactions Work](https://m-t-a.medium.com/python-how-django-transactions-work-a87083303102)
- [@video@Django Database Transactions / atomic() function](https://www.youtube.com/watch?v=L8k8Ukw1P6U)