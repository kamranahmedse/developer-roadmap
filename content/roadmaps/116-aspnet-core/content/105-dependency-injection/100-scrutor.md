# Scrutor
A common feature is to provide automatic registration of services by scanning the types in the assembly, and looking for those that match a convention. This can greatly reduce the boilerplate configuration required in your Startup.ConfigureServices method.

For example, if your registrations at the moment look like this:

services.AddScoped<IFoo, Foo>();
services.AddScoped<IBar, Bar>();
services.AddScoped<IBaz, Baz>();

then you might be able to simplify your DI configuration using assembly scanning to be more like this:

services.Scan(scan => 
    scan.FromCallingAssembly()                    
        .AddClasses()
        .AsMatchingInterface());
       
Assembly scanning with Scrutor:
  The Scrutor API consists of two extension methods on IServiceCollection: Scan() and Decorate(). In this post I'm just going to be looking at the Scan method, and some of the options it provides.

  The Scan method takes a single argument: a configuration action in which you define four things:

  A selector - which implementations (concrete classes) to register
  A registration strategy - how to handle duplicate services or implementations
  The services - which services (i.e. interfaces) each implementation should be registered as
  The lifetime - what lifetime to use for the registrations

  For example a Scan method which looks in the calling assembly, and adds all concrete classes as transient services would look like the following:

  services.Scan(scan => scan     
  .FromCallingAssembly() // 1. Find the concrete classes
    .AddClasses()        //    to register
      .UsingRegistrationStrategy(RegistrationStrategy.Skip) // 2. Define how to handle duplicates
      .AsSelf()    // 2. Specify which services they are registered as
      .WithTransientLifetime()); // 3. Set the lifetime for the services
      
      
Specifying the types explicitly:
  The simplest type selector involves providing the types explicitly. For example, to register Service1 and Service2 as transient services:

  services.Scan(scan => scan
    .AddTypes<Service1, Service2>()
      .AsSelf()
      .WithTransientLifetime());
  This is equivalent to

  services.AddTransient<Service1>();
  services.AddTransient<Service2>();
  
  
For example, to only include classes which can be assigned to (i.e. implement) a specific interface, you could do:
  services.Scan(scan => scan
  .FromAssemblyOf<IService>()
    .AddClasses(classes => classes.AssignableTo<IService>())
        .AsImplementedInterfaces()
        .WithTransientLifetime());

you could restrict to only those classes in a specific namespace:
  services.Scan(scan => scan
  .FromAssemblyOf<IService>()
    .AddClasses(classes => classes.InNamespaces("MyApp"))
        .AsImplementedInterfaces()
        .WithTransientLifetime());
  
Alternatively, you can use an arbitrary filter based on the Type itself:
  services.Scan(scan => scan
  .FromAssemblyOf<IService>()
    .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Repository"))
        .AsImplementedInterfaces()
        .WithTransientLifetime());
Once you've defined your concrete class selector, you can optionally define your replacement strategy.
  
Find more info on: https://andrewlock.net/using-scrutor-to-automatically-register-your-services-with-the-asp-net-core-di-container/
  
