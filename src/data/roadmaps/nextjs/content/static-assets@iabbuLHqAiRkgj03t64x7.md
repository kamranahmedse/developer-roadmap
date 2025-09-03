# Static Assets

Static content is any file that is stored in a server and is the same every time it is delivered to users. HTML files and images are examples of this kind of content. Next.js can serve static files under a folder called `public` in the root directory. Files inside `public` can then be referenced by your code starting from the base URL (`/`). It's important to note that Next.js cannot safely cache assets in the public folder because they may change.

Visit the following resources to learn more:

- [@official@public Folder](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder)