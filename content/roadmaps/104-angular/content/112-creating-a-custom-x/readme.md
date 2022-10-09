# Creating a custom x

In Angular one can create their Custom Pipes, Library & Directives. Like

### Creating a Custom Pipe
Firstly, Create a class that implements the PipeTransform interface present in the @angular/core package. Next, Add a Pipe decorator to the same class. Finally, Add the required functionality to the transform(params) method.

### Creating a Custom Library
Firstly, Generate the workspace for the library. Next, Create multiple modules/components in your library and Generate Dummy Angular application in your library to test your library. Next, Build your library file into a package that can be imported by Angular application and Import your library package into your testing application. Finally,  Host library locally in your own private server (or) Host library in npm server.

### Creating a Custom Directive
Creating a custom directive is just like creating an Angular component. To create a custom directive we have to replace @Component decorator with @Directive decorator.
