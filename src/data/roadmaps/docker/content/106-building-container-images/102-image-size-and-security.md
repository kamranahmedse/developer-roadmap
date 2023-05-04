# Image Size and Security

When building container images, it's essential to be aware of both image size and security. The size of the image affects the speed at which your containers are built and deployed. Smaller images lead to faster builds and reduced network overhead when downloading the image. Security is crucial because container images can contain vulnerabilities that could potentially put your applications at risk.

In this section, we'll discuss some best practices for optimizing image size and improving security when building container images.

### Reducing Image Size

- **Use an appropriate base image:** Choose a smaller, more lightweight base image that includes only the necessary components for your application. For example, consider using the `alpine` variant of an official image, if available, as it's typically much smaller in size.

    ```Dockerfile
    FROM node:14-alpine
    ```

- **Run multiple commands in a single `RUN` statement:** Each `RUN` statement creates a new layer in the image, which contributes to the image size. Combine multiple commands into a single `RUN` statement using `&&` to minimize the number of layers and reduce the final image size.

    ```Dockerfile
    RUN apt-get update && \
        apt-get install -y some-required-package
    ```

- **Remove unnecessary files in the same layer:** When you install packages or add files during the image build process, remove temporary or unused files in the same layer to reduce the final image size.

    ```Dockerfile
    RUN apt-get update && \
        apt-get install -y some-required-package && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*
    ```

- **Use `.dockerignore` file:** Add a `.dockerignore` file in your project directory to exclude files and directories that are not required in the container image.

    ```dockerignore
    .git
    node_modules
    logs/
    ```

### Enhancing Security

- **Keep base images updated:** Regularly update the base images you're using in your Dockerfiles to ensure they include the latest security patches.

- **Avoid running containers as root:** Always use a non-root user when running your containers to minimize potential risks. Create a user and switch to it before running your application.

    ```Dockerfile
    RUN addgroup -g 1000 appuser && \
        adduser -u 1000 -G appuser -D appuser
    USER appuser
    ```

- **Limit the scope of `COPY` or `ADD` instructions:** Be specific about the files or directories you're copying into the container image. Avoid using `COPY . .` as it may unintentionally include sensitive files.

    ```Dockerfile
    COPY package*.json ./
    COPY src/ src/
    ```

- **Scan images for vulnerabilities:** Use tools like [Anchore](https://anchore.com/) or [Clair](https://github.com/quay/clair) to scan your images for vulnerabilities and fix them before deployment.

By following these best practices, you'll be able to build more efficient and secure container images, leading to improved performance and a reduced risk of vulnerabilities in your applications.