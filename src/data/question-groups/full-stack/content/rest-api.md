A **REST API** (Representational State Transfer Application Programming Interface) is a standardized way for applications to communicate over HTTP by following a set of principles. It allows clients (like web browsers or mobile apps) to interact with servers to perform operations like fetching or modifying data.

**Key Features of a REST API**:

1. **Stateless Communication**: Each request from the client to the server must contain all the information needed for the server to process it, with no reliance on stored session data.  
2. **Resource-Based**: Data and functionality are treated as "resources" accessed using endpoints (URLs).  
   * Example: `/users` to get a list of users, `/users/1` to access a specific user.  
3. **HTTP Methods**: REST APIs use HTTP methods to define actions:  
   * **GET**: Retrieve data.  
   * **POST**: Create new resources.  
   * **PUT**: Update existing resources.  
   * **DELETE**: Remove resources.  
4. **Structured Responses**: Data is typically returned in a lightweight format like **JSON** or **XML**.

**Why is it Used?**

* **Interoperability**: REST APIs enable communication between different systems and platforms, making them ideal for building **web services**.  
* **Scalability**: They are stateless, allowing them to handle more traffic with horizontal scaling.  
* **Ease of Use**: Clear structure and standard conventions make it easy for developers to understand and implement.  
* **Flexibility**: Suitable for a variety of clients, from **web applications** to mobile and IoT devices.