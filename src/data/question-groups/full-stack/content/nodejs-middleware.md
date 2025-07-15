Middleware in Express is a function that processes requests and responses in the app’s request-response cycle. It can be used to modify request/response objects adding extra information or removing unnecessary data, it can execute code (like logging, parsing JSON, etc) and it can also end the request-response cycle, allowing it to short-circuit the process and return a different response (commonly used to handle invalid or unauthorized requests).

Example:  
```javascript
app.use((req, res, next) => {
  console.log('Middleware triggered');
  next();
});
```