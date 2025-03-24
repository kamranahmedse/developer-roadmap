There are many ways to handle authentication, from simple auth, all the way to oAuth. The right option depends on your particular business needs.  
A classical example is using JWT for authenticating a website with a RESTful API using the following process:

1. **Frontend**: Present a login form to collect credentials from the user.  
2. **Backend**: Verify credentials against a database and if they’re valid, create a signed token and return it in the response.  
3. **Secure connection**: From this point on, the frontend will send the token on every request and the backend will validate it to ensure it’s a valid and authenticated user.  
4. **Secured best practices**: Ensure your passwords are hashed (e.g., with bcrypt) and use HTTPS for a secured data transmission channel.