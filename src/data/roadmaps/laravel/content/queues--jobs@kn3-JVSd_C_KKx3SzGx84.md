# Queues & Jobs

Queues and jobs provide a mechanism to defer the processing of time-consuming tasks, such as sending emails, processing large datasets, or performing complex calculations, to a later time. Instead of executing these tasks immediately within a web request, they are pushed onto a queue. A worker process then retrieves and executes these jobs in the background, freeing up the web server to handle incoming requests more efficiently and improving the application's responsiveness.

Visit the following resources to learn more:

- [@official@Queues](https://laravel.com/docs/queues)
- [@article@Creating Jobs](https://laravel.com/docs/queues#creating-jobs)
- [@article@How to Use Queueing in Laravel](https://www.twilio.com/en-us/blog/queueing-in-laravel)
- [@article@Laravel Queue Jobs](https://medium.com/@hossamsoliuman/laravel-queue-jobs-4dec9ccf0ae7)
- [@video@Queues in Laravel: Main Things You Need to Know (Two Examples)](https://www.youtube.com/watch?v=D5tr7r2_i7E)