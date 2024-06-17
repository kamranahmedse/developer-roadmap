# Image Size and Security

When building container images, it's essential to be aware of both image size and security. The size of the image affects the speed at which your containers are built and deployed. Smaller images lead to faster builds and reduced network overhead when downloading the image. Security is crucial because container images can contain vulnerabilities that could potentially put your applications at risk.

## Reducing Image Size

- **Use an appropriate base image:** Choose a smaller, more lightweight base image that includes only the necessary components for your application. For example, consider using the `alpine` variant of an official image, if available, as it's typically much smaller in size.

    ```dockerfile
    FROM node:14-alpine
    ```

- **Run multiple commands in a single `RUN` statement:** Each `RUN` statement creates a new layer in the image, which contributes to the image size. Combine multiple commands into a single `RUN` statement using `&&` to minimize the number of layers and reduce the final image size.

    ```dockerfile
    RUN apt-get update && \
        apt-get install -y some-required-package
    ```

- **Remove unnecessary files in the same layer:** When you install packages or add files during the image build process, remove temporary or unused files in the same layer to reduce the final image size.

    ```dockerfile
    RUN apt-get update && \
        apt-get install -y some-required-package && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*
    ```

- **Use multi-stage builds:** Use multi-stage builds to create smaller images. Multi-stage builds allow you to use multiple `FROM` statements in your Dockerfile. Each `FROM` statement creates a new stage in the build process. You can copy files from one stage to another using the `COPY --from` statement.

    ```dockerfile
    FROM node:14-alpine AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    FROM node:14-alpine
    WORKDIR /app
    COPY --from=build /app/dist ./dist
    COPY package*.json ./
    RUN npm install --production
    CMD ["npm", "start"]
    ```

- **Use `.dockerignore` file:** Use a `.dockerignore` file to exclude unnecessary files from the build context that might cause cache invalidation and increase the final image size.

    ```
    node_modules
    npm-debug.log
    ```

## Enhancing Security

- **Keep base images updated:** Regularly update the base images you're using in your Dockerfiles to ensure they include the latest security patches.

- **Avoid running containers as root:** Always use a non-root user when running your containers to minimize potential risks. Create a user and switch to it before running your application.

    ```dockerfile
    RUN addgroup -g 1000 appuser && \
        adduser -u 1000 -G appuser -D appuser
    USER appuser
    ```

- **Limit the scope of `COPY` or `ADD` instructions:** Be specific about the files or directories you're copying into the container image. Avoid using `COPY . .` as it may unintentionally include sensitive files.

    ```dockerfile
    COPY package*.json ./
    COPY src/ src/
    ```

- **Scan images for vulnerabilities:** Use tools like [Anchore](https://anchore.com/) or [Clair](https://github.com/quay/clair) to scan your images for vulnerabilities and fix them before deployment.

By following these best practices, you'll be able to build more efficient and secure container images, leading to improved performance and a reduced risk of vulnerabilities in your applications.

Visit the following resources to learn more:

- [@official@Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
