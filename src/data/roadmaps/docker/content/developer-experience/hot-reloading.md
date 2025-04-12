# Hot Reloading in Docker

Even though we can speed up the image building with layer caching enable, we don't want to have to rebuild our container image with every code change. Instead, we want the state of our application in the container to reflect changes immediately. We can achieve this through a combination of bind mounts and hot reloading utilities!

Have a look at the following resources for sample implementations:

- [@article@Hot Reloading - Docker](https://courses.devopsdirective.com/docker-beginner-to-pro/lessons/11-development-workflow/01-hot-reloading)
