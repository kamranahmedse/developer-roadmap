---
title: 'User Wallets'  
description: 'Microservices for user management and moey transactions'  
isNew: true  
sort: 7  
difficulty: 'intermediate'  
nature: 'REST'
skills:  
  - 'Go'  
  - 'Kafka'  
  - 'NATS'  
  - 'Postgres'
  - 'Docker'
seo:  
  title: 'User Wallets'  
  description: 'Microservices for user management and moey transactions'  
  keywords:  
    - 'go'  
    - 'rest'  
    - 'kafka'  
    - 'microservices'  
    - 'NATS'  
    - 'postgres'  
roadmapIds:  
  - 'backend'  

---

Here you will learn the basic Go miscroservices projec structure. You will be challenged to create two services. To communicate with them you are ging to create a symple
REST interface. The services are goning to talk to each other over Kafka and NATS messaging servers. All of the transactions are going to be recorded in Postgres database.  

## Detailed requirements

### User-service:
1. CreateUser API / HTTP POST:
This request should create an entry in users table (columns: user_id, email, created_at) inside user-service
and then push an event ("user-created") into kafka with payload = { user_id: <id>, email: '<user email>',
created_at : <user_created_at> }, This payload should be consumed by the transaction-service and it should
also have an user table, that store these columns (user_id, balance, created_at) and makes an entry from the
payload received.
2. Balance API / HTTP GET:
When this request is called, you should fetch the user’s latest balance. Request Body: { email: " "} |
Response Body: { email: "" , balance: "" }
You should not store user balance data in user microservice and it should be fetched only from transactionservice by make a service-to-service call using nats sync subcriber (https://github.com/nats-io/nats.go#basicusage).
Request flow => HTTP Request -> User service -> [nats sync req] -> transaction service -> [nats sync res] ->
User service -> Http response

### Transactions-service:
1. Add money API / HTTP POST:
This API credits money to a user account and you should update user's current balance in the user table. And
every balance change should be recorded in another table called transactions. And API should respond with
updated user balance.
Request params: { user_id, amount }
Response params: { updated_balance: }
2. Transfer money:
This API transfers funds from one user to another, we should also make 2 entires in transactions table, 1) for
debiting funds from user A and 2) for crediting funds into user B
Req params: {from_user_id: , to_user_id, amount_to_transfer} 

---

After completing this project, you will have a solid foundation in Go, and how to create simple REST microservices. You will understand how to handle situations where the transaction didn't succseed. Also you will touch the basics on message queues - Kafka and NATS.
