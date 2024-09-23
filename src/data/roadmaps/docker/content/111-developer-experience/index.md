# Developer Experience

So far we have only discussed using docker for deploying applications. However, docker is also a great tool for developing applications. There are a few different recommendations that you can adopt to improve your development experience.

- Use `docker-compose` in your application for ease of development.
- Use bind mounts to mount the code from your local into the container filesystem to avoid having to rebuild the container image with every single change.
- For auto-reloading, you can use tools like [vite](https://vitejs.dev/) for client side, [nodemon](https://nodemon.io/) for nodejs or [air](https://github.com/cosmtrek/air) for golang.
- You should also provide a way to debug your applications. For example, look into [delve](https://github.com/go-delve/delve) for Go, enable debugging in node.js using --inspect flag etc. It doesn't matter what you use, but the point is that you should have a way to debug your application running inside the container.
- You should have a way to run tests inside the container. For example, you could have a separate docker-compose file for running tests.
- You should have a CI pipeline for production images.
- Ephemeral environment for each pull request

For more details and practical examples:

- [@article@Developer Experience Wishlist - Docker](https://courses.devopsdirective.com/docker-beginner-to-pro/lessons/11-development-workflow/00-devx-wishlist#key-devx-features)
- [@official@Docker Developer Experience](https://www.docker.com/blog/cto-chat-overcoming-the-developer-experience-gap-feat-redmonk-flow-io/)
