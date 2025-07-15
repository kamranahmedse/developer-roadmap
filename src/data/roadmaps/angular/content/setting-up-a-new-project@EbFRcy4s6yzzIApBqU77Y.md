# Setting up a New Project

Setting up a new Angular project is streamlined by the **Angular CLI**, a command-line interface that automates the initial setup. First, ensure Node.js and npm are installed, then globally install the CLI itself via `npm install -g @angular/cli`. With the CLI in place, navigate to your desired directory and initiate a new project using `ng new your-project-name`, where you'll be prompted to configure options like routing and stylesheet format, with the `--standalone` flag being a common addition for modern projects. Once the project is scaffolded and dependencies are installed, change into your new project directory (`cd your-project-name`) and launch the development server with `ng serve`, making your new Angular application accessible in your browser, typically at `http://localhost:4200/`.

Visit the following resources to learn more:

- [@official@Installation](https://angular.dev/installation)
- [@official@Setting up the local environment and workspace](https://angular.dev/tools/cli/setup-local)
- [@official@Build your first Angular app](https://angular.dev/tutorials/first-app)
