# microservices
Microservices, also known as the microservice architecture, are an architectural style which structures an application as a loosely coupled collection of smaller applications. The microservice architecture allows for the rapid and reliable delivery of large, complex applications. Some of the most common features for a microservice are:

• it is maintainable and testable;

• it is loosely coupled with other parts of the application;

• it  can deployed by itself;

• it is organized around business capabilities;

• it is often owned by a small team.

# The microservices we build will include the following functionality:

• A Front End service, that just displays web pages;
• An Authentication service, with a Postgres database;
• A Logging service, with a MongoDB database;
• A Listener service, which receives messages from RabbitMQ and acts upon them;
• A Broker service, which is an optional single point of entry into the microservice cluster;
• A Mail service, which takes a JSON payload, converts into a formatted email, and send it out.
