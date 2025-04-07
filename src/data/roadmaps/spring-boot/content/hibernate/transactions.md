# Transactions

A transaction simply represents a unit of work. In such case, if one step fails, the whole transaction fails (which is termed as atomicity). A transaction can be described by ACID properties (Atomicity, Consistency, Isolation and Durability).

In hibernate framework, we have Transaction interface that defines the unit of work. It maintains abstraction from the transaction implementation (JTA,JDBC).

For more information, visit the following links:

- [@article@Hibernate Transaction Management](https://www.javaguides.net/2018/12/hibernate-transaction-management-tutorial.html)
- [@article@Hibernate Transaction](https://www.w3schools.blog/hibernate-transaction-management)
