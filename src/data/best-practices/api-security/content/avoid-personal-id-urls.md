# Avoid Personal ID in URLs

> Avoid user’s personal ID in the resource URLs e.g. users/242/orders

 User's own resource ID should be avoided. Use `/me/orders` instead of `/user/654321/orders`. This will help avoid the risk of exposing the user’s personal ID that can be used for further attacks.