# Chef

Emerging in 2009, Chef (now known as Progress Chef) is one of the earliest configuration management tools to gain popularity. Chef "Recipes" are written in Ruby, in a primarily declarative style. Chef requires that a client is installed on a server being managed. This client polls a Chef-Server regularly, to determine what its configuration should be. Chef-Solo is also available, a version of Chef that allows provisioning of a single node by running chef locally. A key tenet of Chef recipe design is the concept of idempotence. All Chef recipes should be runnable multiple times and produce the same result - this is especially necessary in cases where the client/server model listed above is in use. This pattern of configuration management is highly influential for future declarative tools like Terraform and Cloud Formation.

Visit the following resources to learn more:

- [@official@Chef Website](https://www.chef.io/products/chef-infra)
- [@article@Chef Tutorial](https://www.tutorialspoint.com/chef/index.htm)
- [@video@chef/chef](https://github.com/chef/chef)
- [@feed@Explore top posts about Chef](https://app.daily.dev/tags/chef?ref=roadmapsh)
