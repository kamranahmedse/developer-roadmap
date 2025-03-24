---
title: 'How to Build a Rest API in Golang (Detailed Tutorial)'
description: 'Want to build a REST API in Golang? Follow our detailed tutorial to set up, code, and deploy your API with best practices and clear examples.'
authorId: william
excludedBySlug: '/golang/rest-api'
seo:
  title: 'How to Build a Rest API in Golang (Detailed Tutorial)'
  description: 'Want to build a REST API in Golang? Follow our detailed tutorial to set up, code, and deploy your API with best practices and clear examples.'
  ogImageUrl: 'https://assets.roadmap.sh/guest/build-a-rest-api-in-golang-k3zuq.jpg'
relatedGuidesTitle: 'Other Guides'
isNew: true
type: 'textual'
date: 2025-01-17
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'textual-guide'
  - 'guide-sitemap'
---

![How to Build a Rest API in Golang](https://assets.roadmap.sh/guest/build-a-rest-api-in-golang-k3zuq.jpg)

Building a REST API in [Go](https://roadmap.sh/golang) offers a blend of high performance, ease of deployment, and scalability. Go’s efficient runtime and built-in concurrency model make it an ideal choice for building applications that handle large volumes of requests while still maintaining low latency. With a robust standard library and supportive ecosystem, you can quickly implement REST functionality into your applications.

Since its official release in 2009, Go has gained massive adoption and is gradually becoming the go-to technology for building applications, from small-scale to mission-critical systems. Its adoption surged even further when industry leaders used it to power containerization and orchestration tools like [Docker](https://roadmap.sh/docker) and [Kubernetes](https://roadmap.sh/kubernetes). Whether you’re building a small service or a mission-critical application, Go provides a powerful foundation for REST API development.

Given these advantages, let's put Go's capabilities into practice. In this guide, you will build a basic bookkeeping management API that supports create, read, update, and delete (CRUD) functionalities. You’ll also write unit tests for these functionalities to ensure they work as intended, implement authentication to secure the APIs, and create comprehensive documentation.

Let’s get started building the application.

## Step 1: Project set up

To get started, use your terminal to create a project directory.

```bash
mkdir go_book_api && cd go_book_api
```

These commands create a directory called `go_book_api` and navigate into it.

Next, initialize a [Go module](https://go.dev/doc/tutorial/create-module) within the project.

```bash
go mod init go_book_api
```

This command creates a `go.mod` file for tracking the project dependencies.

Finally, install the required dependencies.

```bash
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u gorm.io/driver/sqlite
go get -u github.com/joho/godotenv
```

Let’s look at what these dependencies are and what they are used for:

[Gin](https://gin-gonic.com/) is a framework for building web applications.

[Gorm](https://gorm.io/docs/index.html) is a Go-based Object Relational Mapper (ORM). ORMs make it easy to query and manipulate data from a database. The installation also includes both [Postgres](https://github.com/go-gorm/postgres) and [SQLite](https://github.com/go-gorm/sqlite) drivers. You’ll use the Postgres driver to interact with your application data, while SQLite will mock your database interaction when writing unit tests.

[godotenv](https://github.com/joho/godotenv) is a library for loading environment variables.

**Set up the project database**
To save your API data, you need to set up your project database on [Neon](https://console.neon.tech/realms/prod-realm/protocol/openid-connect/registrations?client_id=neon-console&redirect_uri=https%3A%2F%2Fconsole.neon.tech%2Fauth%2Fkeycloak%2Fcallback&response_type=code&scope=openid+profile+email&state=FB3kotT4P_2z1eLKxJJvkA%3D%3D%2C%2C%2C). Neon is a fully managed serverless PostgreSQL database with a generous free tier you can start with.

To set up your database, log into your [Neon console](https://console.neon.tech/app/projects) and create a project.

![Set up a project](https://assets.roadmap.sh/guest/neon-create-project-i4u20.png)

On successful creation of the project, copy the database URL.

![Copy database URL](https://assets.roadmap.sh/guest/neon-successful-project-r4jiw.png)

> Alternatively, you can use any managed Postgres service or a local Postgres instance.

Lastly, create `.env` in your project directly and add the copied database URL.

```bash
DB_URL=<REPLACE THIS WITH YOUR DATABASE URL>
```

## Step 2: Structuring the project

While Go doesn’t enforce how you should structure your project, it is essential you have a good structure when building an application with Go. It makes your codebase easy to maintain and clear for others to understand.

To structure your project, create an `api`, `cmd`, and `tests` folders.

`api` is for organizing API development-related files.
`cmd` is used to organize the application entry point. This is a convention within the Go community.
`tests` are for organizing unit tests.

## Step 3: Implement CRUD operations for the bookkeeping application

Create an `api/model.go` file to structure the application’s data and response.

```go
package api

import "github.com/gin-gonic/gin"

type Book struct {
	ID     uint   `json:"id" gorm:"primaryKey"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Year   int    `json:"year"`
}

type JsonResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func ResponseJSON(c *gin.Context, status int, message string, data any) {
	response := JsonResponse{
		Status:  status,
		Message: message,
		Data:    data,
	}

	c.JSON(status, response)
}
```

The code snippet above creates a `Book` and `JsonResponse` structs with the required properties using struct tags (e.g., `json:"title"`) and a helper function `ResponseJSON` to manage API responses.

> The struct tag lets you send responses that fit into the JSON naming convention.

### Create a new book

To create a new book handler function, create an `api/handlers.go` file that will contain the application business logic. It’s important to separate the business logic from the data model, as it helps deliver scalable, maintainable, and testable code.

```go
package api

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"net/http"
	"os"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// migrate the schema
	if err := DB.AutoMigrate(&Book{}); err != nil {
		log.Fatal("Failed to migrate schema:", err)
	}
}

func CreateBook(c *gin.Context) {
	var book Book

	//bind the request body
	if err := c.ShouldBindJSON(&book); err != nil {
		ResponseJSON(c, http.StatusBadRequest, "Invalid input", nil)
		return
	}
	DB.Create(&book)
	ResponseJSON(c, http.StatusCreated, "Book created successfully", book)
}
```

The code snippet declares a global variable `DB` that holds the database connection and is then initialized inside the `InitDB` function. The `InitDB` function loads the environment variable to connect to the database and performs automatic schema migration. Finally, create a `CreateBook` handler that uses the `DB` variable to create a new book, handle errors, and return the appropriate response using the `ResponseJSON` helper.

> When a function, type, or variable is declared with an initial capital letter, it is **exported**. This means it is visible and can be accessed by other packages.

### Getting the list of books

To retrieve the list of books, create a `GetBooks` handler that uses the `DB` variable to get the list of available books inside the database.

```go
func GetBooks(c *gin.Context) {
	var books []Book
	DB.Find(&books)
	ResponseJSON(c, http.StatusOK, "Books retrieved successfully", books)
}
```

### Get a single book

To retrieve a book, create a `GetBook` handler that uses the `DB` variable to get a book matching the specified ID and returns the appropriate response.

```go
func GetBook(c *gin.Context) {
	var book Book
	if err := DB.First(&book, c.Param("id")).Error; err != nil {
		ResponseJSON(c, http.StatusNotFound, "Book not found", nil)
		return
	}
	ResponseJSON(c, http.StatusOK, "Book retrieved successfully", book)
}
```

### Update a book

To update a book, create an `UpdateBook` handler that uses the `DB` variable to get a book matching the specified ID, updates it, and returns the appropriate response.

```go
func UpdateBook(c *gin.Context) {
	var book Book
	if err := DB.First(&book, c.Param("id")).Error; err != nil {
		ResponseJSON(c, http.StatusNotFound, "Book not found", nil)
		return
	}

	// bind the request body
	if err := c.ShouldBindJSON(&book); err != nil {
		ResponseJSON(c, http.StatusBadRequest, "Invalid input", nil)
		return
	}

	DB.Save(&book)
	ResponseJSON(c, http.StatusOK, "Book updated successfully", book)
}
```

### Delete a book

To delete a book, create a `DeleteBook` handler that uses the `DB` variable to get a book matching the specified ID, deletes it, and returns the appropriate response.

```go
func DeleteBook(c *gin.Context) {
	var book Book
	if err := DB.Delete(&book, c.Param("id")).Error; err != nil {
		ResponseJSON(c, http.StatusNotFound, "Book not found", nil)
		return
	}
	ResponseJSON(c, http.StatusOK, "Book deleted successfully", nil)
}
```

### Putting it all together

With the handlers set up, you need to create the application entry point and specify the application routes. To do this, create a `cmd/main.go` file and add the code snippet below:

```go
package main

import (
	"github.com/gin-gonic/gin"
	"go_book_api/api"
)

func main() {
	api.InitDB()
	r := gin.Default()

	//routes
	r.POST("/book", api.CreateBook)
	r.GET("/books", api.GetBooks)
	r.GET("/book/:id", api.GetBook)
	r.PUT("/book/:id", api.UpdateBook)
	r.DELETE("/book/:id", api.DeleteBook)

	r.Run(":8080")
}
```

The snippet above creates a `main` function that initializes the database, specifies the routes with the associated handlers, and runs the application on port `8080`.

## Step 4: Testing the REST APIs

To test the APIs, you need a [Postman](https://www.postman.com/downloads/) or any API testing application of your choice.

In your terminal, start the development server by running the command.

```bash
go run cmd/main.go
```

Then, use the API testing client of your choice to test out the endpoints as shown below:

### Create a book endpoint

Use the `POST` method and pass in the required data to create a new book.

```bash
curl --location 'localhost:8080/book' \
     --header 'Content-Type: application/json' \
     --data '{
       "title": "Go by Example: Programmer'\''s guide to idiomatic and testable code",
       "author": "Inanc Gumus",
       "year": 2021
     }'
```

![Create a book](https://assets.roadmap.sh/guest/postman-create-book-558ii.png)

### Get the list of books

Use the `GET` method to get the list of existing books in the database.

```bash
curl --location 'localhost:8080/books'
```

![List of books](https://assets.roadmap.sh/guest/postman-list-books-7y7qi.png)

### Get a book endpoint

Use the `GET` method and add the ID to get the details of an existing book.

```bash
curl --location 'localhost:8080/book/3'
```

![Get a book](https://assets.roadmap.sh/guest/postman-get-book-mhlxj.png)

### Update a book endpoint

Use the `PUT` method and specify the ID and the data to update an existing book.

```bash
curl --location --request PUT 'localhost:8080/book/3' \
    --header 'Content-Type: application/json' \
    --data '{
        "title": "Go by Example: Programmer'\''s guide to idiomatic and testable code - Updated",
        "author": "Inanc Gumus",
        "year": 2023
    }'
```

![Updated a book](https://assets.roadmap.sh/guest/postman-update-book-1b5k2.png)

### Delete a book

Make a `DELETE` request with an already created book ID.

```bash
curl --location --request DELETE 'localhost:8080/book/3'
```

![Delete a book.](https://assets.roadmap.sh/guest/postman-delete-book-t325s.png)

You can also query your Neon database to see the latest changes.

![Neon database](https://assets.roadmap.sh/guest/neon-list-changes-mbxz0.png)

## Step 5: Unit testing the API handler functions

Go comes with a testing package that makes it easy to write unit tests, integration tests, functional tests, and end-to-end tests. To begin, create a `tests/main_test.go` file and add the code snippet below:

```go
package tests

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"go_book_api/api"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

func setupTestDB() {
	var err error
	api.DB, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect test database")
	}
	api.DB.AutoMigrate(&api.Book{})
}

func addBook() api.Book {
	book := api.Book{Title: "Go Programming", Author: "John Doe", Year: 2023}
	api.DB.Create(&book)
	return book
}
```

The snippet above creates helper functions `setupTestDB` and `addBook`, which initialize a new SQLite in-memory database (`:memory:` ) specifically for testing purposes and insert a new book record into the test database, respectively.

> Ending the test name with `_test.go` is a standard naming convention in the Go ecosystem.

### Create a new book unit test

Create a `TestCreateBook` test function that sets up a mock HTTP server using Gin, sends a POST request to create a book, and checks that the response matches the expected outcome and the HTTP status code defined in the `CreateBook` handler.

```go
func TestCreateBook(t *testing.T) {
	setupTestDB()
	router := gin.Default()
	router.POST("/book", api.CreateBook)

	book := api.Book{
		Title: "Demo Book name", Author: "Demo Author name", Year: 2021,
	}

	jsonValue, _ := json.Marshal(book)
	req, _ := http.NewRequest("POST", "/book", bytes.NewBuffer(jsonValue))

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusCreated {
		t.Errorf("Expected status %d, got %d", http.StatusCreated, status)
	}
	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Data == nil {
		t.Errorf("Expected book data, got nil")
	}
}
```

### Get the list of books unit test

Similar to the `TestCreateBook` test function, create a `TestGetBooks` that tests the `GetBooks` handler functionality of retrieving a list of books via a GET request.

```go
func TestGetBooks(t *testing.T) {
	setupTestDB()
	addBook()
	router := gin.Default()
	router.GET("/books", api.GetBooks)

	req, _ := http.NewRequest("GET", "/books", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, status)
	}

	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if len(response.Data.([]interface{})) == 0 {
		t.Errorf("Expected non-empty books list")
	}
}
```

### Get a book unit test

Create a `TestGetBook` test function that tests the `GetBook` handler functionality of retrieving a single book that matches the specified ID via a GET request.

```go
func TestGetBook(t *testing.T) {
	setupTestDB()
	book := addBook()
	router := gin.Default()
	router.GET("/book/:id", api.GetBook)

	req, _ := http.NewRequest("GET", "/book/"+strconv.Itoa(int(book.ID)), nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, status)
	}

	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Data == nil || response.Data.(map[string]interface{})["id"] != float64(book.ID) {
		t.Errorf("Expected book ID %d, got nil or wrong ID", book.ID)
	}
}
```

### Update a book unit test

Create a `TestUpdateBook` test function that tests the `UpdateBook` handler functionality of updating an existing book through a PUT request.

```go
func TestUpdateBook(t *testing.T) {
	setupTestDB()
	book := addBook()
	router := gin.Default()
	router.PUT("/book/:id", api.UpdateBook)

	updateBook := api.Book{
		Title: "Advanced Go Programming", Author: "Demo Author name", Year: 2021,
	}
	jsonValue, _ := json.Marshal(updateBook)

	req, _ := http.NewRequest("PUT", "/book/"+strconv.Itoa(int(book.ID)), bytes.NewBuffer(jsonValue))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, status)
	}

	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Data == nil || response.Data.(map[string]interface{})["title"] != "Advanced Go Programming" {
		t.Errorf("Expected updated book title 'Advanced Go Programming', got %v", response.Data)
	}
}
```

### Delete a book unit test

Create a `TestDeleteBook` test function that tests the `DeleteBook` handler functionality of deleting an existing book through a DELETE request.

```go
func TestDeleteBook(t *testing.T) {
	setupTestDB()
	book := addBook()
	router := gin.Default()
	router.DELETE("/book/:id", api.DeleteBook)

	req, _ := http.NewRequest("DELETE", "/book/"+strconv.Itoa(int(book.ID)), nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, status)
	}

	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Message != "Book deleted successfully" {
		t.Errorf("Expected delete message 'Book deleted successfully', got %v", response.Message)
	}

	//verify that the book was deleted
	var deletedBook api.Book
	result := api.DB.First(&deletedBook, book.ID)
	if result.Error == nil {
		t.Errorf("Expected book to be deleted, but it still exists")
	}
}
```

Finally, you can run your test in the development environment using the command below:

```bash
GIN_MODE=release go test tests/main_test.go -v
```

> `GIN_MODE=release` is a command in Gin that tells it to mimic the production environment and run the test in an optimized mode.

![running the test](https://assets.roadmap.sh/guest/running-the-test-nd189.png)

## Adding authentication to the REST APIs

An integral part of building a robust API is the authentication mechanism. It verifies the identity of a user or system using your API. When you have authentication set up in your API, you can:

- Prevent unauthorized access to sensitive resources or data.
- Control the level of access.
- Track and log who accessed the API and what actions they performed.
- Tailored responses or experiences for authenticated users.

In Go, you can implement authentication using any of the following methods:

- JSON Web Tokens (JWT).
- OAuth 2.0.
- Session-based authentication.
- API Keys.

For this project, you'll use JWT (JSON Web Tokens) to secure the API. The process begins with a user providing their credentials, such as a username and password. The system then verifies these credentials and issues a token, which the user can use to access protected endpoints.

To get started, install the JWT package.

```bash
go get -u github.com/golang-jwt/jwt/v5
```

### Create a middleware

Middlewares are functions or modules that intercept and process HTTP requests before they reach the final route handler or after the response leaves the handler. In this case, you want to check that the request has the right token before accessing any of the endpoints.

To do this, first update your `.env` file with a secret token. The token ensures the security, authenticity, and integrity of the tokens.

```
SECRET_TOKEN=<REPLACE WITH A RANDOM LONG STRING>
```

Next, create a `middleware.go` file inside the `api` folder and add the snippet below:

```go
package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
)

// Secret key for signing JWT
var jwtSecret = []byte(os.Getenv("SECRET_TOKEN"))

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			ResponseJSON(c, http.StatusUnauthorized, "Authorization token required", nil)
			c.Abort()
			return
		}
		// parse and validate the token
		_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Validate the signing method
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})
		if err != nil {
			ResponseJSON(c, http.StatusUnauthorized, "Invalid token", nil)
			c.Abort()
			return
		}
		// Token is valid, proceed to the next handler
		c.Next()
	}
}
```

The snippet above creates a `JWTAuthMiddleware` function that uses the JWT package to intercept incoming requests and validate their JWT tokens before allowing the request to proceed to the handler.

Next, update the `handlers.go` file with a `GenerateJWT` function that generates a JWT token-based default username and password.

```go
package api

import (
	//other imports
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(c *gin.Context) {
	var loginRequest LoginRequest
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		ResponseJSON(c, http.StatusBadRequest, "Invalid request payload", nil)
		return
	}
	if loginRequest.Username != "admin" || loginRequest.Password != "password" {
		ResponseJSON(c, http.StatusUnauthorized, "Invalid credentials", nil)
		return
	}
	expirationTime := time.Now().Add(15 * time.Minute)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": expirationTime.Unix(),
	})
	// Sign the token
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		ResponseJSON(c, http.StatusInternalServerError, "Could not generate token", nil)
		return
	}
	ResponseJSON(c, http.StatusOK, "Token generated successfully", gin.H{"token": tokenString})
}
```

> In a real-world application, the credentials used to generate the token will be specific to users and not the default ones.

Lastly, update the `main.go` file inside the `cmd` folder to add a public route to generate a token and use the middleware to protect the API routes.

```go
package main

import (
	"github.com/gin-gonic/gin"
	"go_book_api/api"
)

func main() {
	api.InitDB()
	r := gin.Default()

	// Public routes
	r.POST("/token", api.GenerateJWT)

	// protected routes
	protected := r.Group("/", api.JWTAuthMiddleware())
	{
		protected.POST("/book", api.CreateBook)
		protected.GET("/books", api.GetBooks)
		protected.GET("/book/:id", api.GetBook)
		protected.PUT("/book/:id", api.UpdateBook)
		protected.DELETE("/book/:id", api.DeleteBook)
	}

	r.Run(":8080")
}
```

## Testing the REST API

If you restart the server and make a request to any of the endpoints without a token, you’ll get unauthorized.

```bash
curl --location 'localhost:8080/books'
```

![Request without a Token](https://assets.roadmap.sh/guest/postman-test-rest-api-7711y.png)

To test the API with a token, make a request to the token generation endpoint.

```bash
curl --location 'localhost:8080/token' \
    --header 'Content-Type: application/json' \
    --data '{
      "username": "admin",
      "password": "password"
    }'
```

![](https://assets.roadmap.sh/guest/postman-create-token-x6yro.png)

Then, use the generated token to make a request.

```bash
curl --location 'localhost:8080/books' \
     --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM3MDU3Njl9.ULspm6GR9Q0zqZWHifdFEeLZqgtw7k2FDDhSOpwcw4U'
``` 

![](https://assets.roadmap.sh/guest/postman-listing-books-aukjh.png)

## Updating the unit test

Since the API route is now protected, you also need to update the unit test to capture the authentication mechanism.

```go
package tests

import (
	// other imports
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("SECRET_TOKEN"))

func setupTestDB() {
	// setupTestDB goes here
}

func addBook() api.Book {
	// add book code goes here
}

func generateValidToken() string {
	expirationTime := time.Now().Add(15 * time.Minute)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": expirationTime.Unix(),
	})
	tokenString, _ := token.SignedString(jwtSecret)
	return tokenString
}

func TestGenerateJWT(t *testing.T) {
	router := gin.Default()
	router.POST("/token", api.GenerateJWT)

	loginRequest := map[string]string{
		"username": "admin",
		"password": "password",
	}

	jsonValue, _ := json.Marshal(loginRequest)
	req, _ := http.NewRequest("POST", "/token", bytes.NewBuffer(jsonValue))

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, status)
	}

	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Data == nil || response.Data.(map[string]interface{})["token"] == "" {
		t.Errorf("Expected token in response, got nil or empty")
	}
}
```

The snippet above imports the required dependency, creates a `generateValidToken` helper and `TestGenerateJWT` function that generates a token and tests the token generation endpoint, respectively.

Next, use the `generateValidToken` helper function to modify the request object for each test by adding authentication to the route, generating a token, and adding it to the request header. For example, the test for creating a book will look like this:

```go
func TestCreateBook(t *testing.T) {
	setupTestDB()
	router := gin.Default()
	protected := router.Group("/", api.JWTAuthMiddleware()) // add
	protected.POST("/book", api.CreateBook)                 // add

	token := generateValidToken() // add

	book := api.Book{
		Title: "Demo Book name", Author: "Demo Author name", Year: 2021,
	}
	jsonValue, _ := json.Marshal(book)

	req, _ := http.NewRequest("POST", "/book", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", token) // add

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusCreated {
		t.Errorf("Expected status %d, got %d", http.StatusCreated, status)
	}

	var response api.JsonResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Data == nil {
		t.Errorf("Expected book data, got nil")
	}
}
```

## Adding documentation to the REST APIs

Documentation is an integral part of your APIs. It helps you communicate intent and help others understand, maintain, and utilize your APIs effectively. Documentation can be in the form of the following:

- **Technical documentation** that guides developers on APIs, configurations, and architecture of the system.
- **User manual** that helps end-users understand how to use the product.
- **Internal documentation** that captures internal processes, workflows, and other operational details.
- **Code comments** that provide inline explanations of specific sections of the codes.

In Go, you have access to a variety of tools when it comes to generating, maintaining, and displaying documentation. Below are some of the widely used ones:

- GoDoc
- pkg.go.dev
- go doc
- godocdown
- Swagger/OpenAPI

In this project, you’ll use GoDoc to add documentation.

To get started, first update the [Go version](https://go.dev/dl/) based on your operating system. Then, install the GoDoc package using the command below:

```bash
go get golang.org/x/tools/cmd/godoc
```
Next, modify the `handlers.rs` file and add comments to describe what each helper function and handlers do.

```go
/*
Package api provides RESTful handlers and middleware for managing a library of books.
It includes functionality for creating, reading, updating, and deleting books, as well as generating JWT tokens for authentication.
*/
package api

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"net/http"
	"os"
	"time"
)

var DB *gorm.DB

// InitDB initializes the database connection using environment variables.
// It loads the database configuration from a .env file and migrates the Book schema.
func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	// Migrate the schema
	if err := DB.AutoMigrate(&Book{}); err != nil {
		log.Fatal("Failed to migrate schema:", err)
	}
}

// CreateBook handles the creation of a new book in the database.
// It expects a JSON payload with book details and responds with the created book.
func CreateBook(c *gin.Context) {
	var book Book
	if err := c.ShouldBindJSON(&book); err != nil {
		ResponseJSON(c, http.StatusBadRequest, "Invalid input", nil)
		return
	}
	DB.Create(&book)
	ResponseJSON(c, http.StatusCreated, "Book created successfully", book)
}

// GetBooks retrieves all books from the database.
// It responds with a list of books.
func GetBooks(c *gin.Context) {
	var books []Book
	DB.Find(&books)
	ResponseJSON(c, http.StatusOK, "Books retrieved successfully", books)
}

// other handlers goes below
```

Finally, test the documentation by running the command below:

```bash
godoc -http=:6060
```

Open your browser and navigate to the documentation URL:

```bash
http://localhost:6060/pkg/go_book_api/api/
```

![Book API documentation](https://assets.roadmap.sh/guest/golang-package-docs-el1vi.png)

## Next steps

Go’s simplicity, built-in concurrency, cloud-native features, and performance make it a popular choice among developers. The growing ecosystem and community support also ensure that you have the right tools and libraries to build and maintain RESTful APIs efficiently and any other application you want to build.

Apart from the Gin framework, Go also has popular web frameworks like Echo, Revel, and many more for building APIs. To stay up-to-date with the latest changes, check out the [Go roadmap](https://roadmap.sh/golang).
