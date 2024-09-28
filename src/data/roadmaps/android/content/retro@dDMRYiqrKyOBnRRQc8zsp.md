# Retrofit

Retrofit is a type-safe HTTP client for Android and Java. It's designed to connect your application with an API or a back-end web service. Retrofit uses annotations to encode details about the API's operations and requests, such as the HTTP method (GET, POST, PUT, DELETE, HEAD) and the query parameters. The main advantage of Retrofit over other similar libraries is in its simplicity and intuitiveness, and it efficiently handles all network calls.

```java
Retrofit retrofit = new Retrofit.Builder()
                      .baseUrl("https://api.example.com")
                      .addConverterFactory(GsonConverterFactory.create())
                      .build();

ExampleService service = retrofit.create(ExampleService.class);
Call<ExampleResponse> call = service.exampleCall();
```

The `baseUrl()` is your API base URL. The `addConverterFactory()` specifies a factory to use for serialization and deserialization. In the example above, the Gson library will handle the conversion of JSON data. The `build()` call finishes the builder and returns the retrofit instance. Finally, `create()` generates an implementation of the `ExampleService` interface.

Visit the following resources to learn more:

- [@official@Retrofit](https://square.github.io/retrofit/)
- [@opensource@Retrofit on GitHub](https://github.com/square/retrofit)
