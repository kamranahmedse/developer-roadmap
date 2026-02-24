# Always use env variables

API keys, passwords, and tokens should never appear directly in your code. Store them in a `.env` file using environment variables, and make sure that file is listed in `.gitignore` so it never gets pushed to GitHub accidentally.