# Strong Parameters

Controller parameters are the data sent from a client (like a web browser) to your Rails application, typically through forms or API requests. These parameters are accessible within your controller actions. Strong parameters are a security feature in Rails that helps protect your application from mass assignment vulnerabilities. They work by requiring you to explicitly permit which parameters are allowed to be used when creating or updating database records, effectively filtering out any unexpected or malicious data that might be included in the request.

Visit the following resources to learn more:

- [@official@Parameters](https://guides.rubyonrails.org/action_controller_overview.html#parameters)
- [@official@Strong Parameters](https://guides.rubyonrails.org/action_controller_overview.html#strong-parameters)
- [@article@Rails Params: Where do they come from?](https://medium.com/launch-school/params-in-rails-where-do-they-come-from-b172cdb46eb4)
- [@article@How the Rails params hash works](https://www.honeybadger.io/blog/how-the-rails-params-hash-works/)
- [@video@Understanding Rails Params & How to Use Them](https://www.youtube.com/watch?v=01xF2U2oA2M)
- [@video@Ruby On Rails - Strong Parameters in Your Controllers](https://www.youtube.com/watch?v=Z8IrqXK86UM)