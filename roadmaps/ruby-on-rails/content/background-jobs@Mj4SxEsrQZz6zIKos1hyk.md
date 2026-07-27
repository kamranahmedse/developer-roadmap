# Background Jobs in Rails

Background jobs allow you to perform time-consuming tasks outside of the main request-response cycle. This means your web application can remain responsive and quickly handle user requests, while the longer tasks are processed in the background. Rails achieves this using Active Job, a framework for declaring jobs and making them run on a variety of queuing backends like Sidekiq, Resque, or even a simple in-memory queue for development. This abstraction allows developers to write job logic once and easily switch between different background processing systems as needed.

Visit the following resources to learn more:

- [@official@Active Job Basics](https://guides.rubyonrails.org/active_job_basics.html)
- [@article@Rails Background Jobs — Reconstruct Your Application](https://medium.com/@hasnatraza.dev/rails-background-jobs-reconstruct-your-application-ccaef2860552)
- [@article@A Simple Guide to Background Jobs in Ruby on Rails](https://www.bluebash.co/blog/simple-guide-to-background-jobs-in-ruby-on-rails/)
- [@video@Manage asynchronous tasks with Solid Queue | Rails 8 Unpacked](https://www.youtube.com/watch?v=ReyKfb12EVU)
- [@video@Testing Active Job in Ruby on Rails](https://www.youtube.com/watch?v=7ieeu0r27ig)