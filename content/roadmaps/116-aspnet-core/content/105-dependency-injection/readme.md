# Dependency injection
ASP.NET Core supports the dependency injection (DI) software design pattern, which is a technique for achieving Inversion of Control (IoC) between classes and their dependencies.

Code dependencies are problematic and should be avoided for the following reasons:
  1. The configuration code becomes scattered across the app.
  2. This implementation is difficult to unit test.

Dependency injection addresses these problems through:
1. The use of an interface or base class to abstract the dependency implementation.
2. Registration of the dependency in a service container. ASP.NET Core provides a built-in service container, IServiceProvider. Services are typically registered in the app's Program.cs file.
3. Injection of the service into the constructor of the class where it's used. The framework takes on the responsibility of creating an instance of the dependency and disposing of it when it's no longer needed.

By using the DI pattern, the controller or Razor Page:
a. Doesn't use the concrete type, only the interface it implements. That makes it easy to change the implementation without modifying the controller or Razor Page.
b. Doesn't create an instance of class, it is created by the DI container.

There are three types of DI: Construction Injection, Setter Injection, Interface based Injection. 

A] The Construction Injection: This type of DI accepts their dependency at the constructor level which means that when creating an object of the class, their dependency passes through the constructor of the class. It provides a strong dependency contract between objects. 
 
 public class HomeController : Controller
 {
 IHelloWorldService _helloWorldService;
 public HomeController(IHelloWorldService helloWorldService) //constructor injection
 {
 _helloWorldService = helloWorldService;
 }
 }
 

B] The Setter Injection:It is also known as property injection. In this type of dependency injection, dependency passes through public property instead of the constructor. It allows us to pass the dependencies when required. It does not provide a strong dependency contract between objects. 
Get the service instance manually: There is another way to get dependency services from the service container. In this method, the service is not injected in the controller constructor or in the action method as a parameter. Using method "GetService" of the "HttpContext.RequestServices" property, we can get dependent services configured with the Service container. This is also known as property injection. Following is the example.

public IActionResult Index1()
{
 var helloWorldService = (IHelloWorldService)this.HttpContext.RequestServices.GetService(typeof(IHelloWorldService));
 ViewData["MyText"] = helloWorldService.SaysHello() + "Jignesh Trivedi!";
 return View("index");
}

C] The interface-based dependency injection can be achieved by creating the common interface and other classes are implements this interface to inject the dependency. In this type of DI, we can use either constructor injection or setter injection.

- Inject the dependency in the controller action
Sometimes, we required dependency on the particular controller action method not to throughout the controller. ASP.net core MVC allows us to inject the dependency to particular action using the "FromServices" attribute. This attribute tells the ASP.net core framework that parameters should be retrieved from the service container.

 public class DemoController : Controller
 {
 public IActionResult Index([FromServices] IHelloWorldService helloWorldService)
 {
 ViewData["MyText"] = helloWorldService.SaysHello() + "Jignesh!";
 return View();
 }
 }
 
- Dependency injection into Views: 
 ASP.net core can also able to inject the dependency to View. This is very useful to inject service related views such as localization. This method will bypass the controller call and fetch data directly from the service. We can inject the service dependency into the view using the @inject directive. 
 @inject <type> <instance name>
  
Example:
@inject DepedencyInjectionExample.Service.IHelloWorldService helloWorldService
@helloWorldService.SaysHello() Reader!!!

View injection can be used to populate the UI elements such as dropdown. The common dropdown such city/state dropdown can be populated from the service. Rendering such things from the service is a standard approach in ASp.net core MVC. Alternatively, we can use view bag and Viewdata to populate dropdown. The directive @inject is also be used to override the injected service. For example, we are using the Html helper service for rendering the Html tags such as dropdown, textbox, etc. We can replace this service with our own service using the @inject directive.

Summary
A] Dependency Injection (DI) is one of the frequently used design patterns that will help you to decouple the different parts of their applications effectively. DI provides a mechanism or a way for the construction of the strict dependency graphs while having the independence of the complete class definitions.

B] Dependency injection is the design pattern that allows us to inject the dependency into the class from the outer world rather than creating with in class. This will help us to create a loosely coupled applications so that it has provided greater maintainability, testability, and also reusability. There is a built-in support of dependency injection in ASP.net Core. This supports is not limited to middleware, but also support in Controllers, views, and model as well. There are three easy steps to use Dependency injection into ASP.net core MVC application.

1. Create the service
2. Register the service into the ConfigureService method of the startup class, so that is available to use
3. Inject the service that you want to use
ASP.net core allows us to specify the lifetime for registered services based on our requirement to use the service. The service can either register as Singleton, Transient, or Scoped.
