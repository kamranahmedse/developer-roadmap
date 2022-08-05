# Chef

Emerging in 2009, [Chef](https://en.wikipedia.org/wiki/Progress_Chef) (now known as Progress Chef) is one of the earliest configuration management tools to gain popularity. Chef "Recipes" are written in Ruby, in a primarily [declarative](https://en.wikipedia.org/wiki/Declarative_programming) style.

Chef requires that a client is installed on a server being managed.  This client polls a Chef-Server regularly, to determine what its configuration should be. Chef-Solo is also available, a version of Chef that allows provisioning of a single node by running chef locally.

A key tenet of Chef recipe design is the concept of [idempotence](https://en.wikipedia.org/wiki/Idempotence). All Chef recipes should be runnable multiple times and produce the same result - this is especially necessary in cases where the client/server model listed above is in use. This pattern of configuration management is highly influential for future declarative tools like Terraform and Cloud Formation.

<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://www.chef.io/products/chef-infra'>Chef Website</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.tutorialspoint.com/chef/index.htm'>Chef Tutorial</BadgeLink>
