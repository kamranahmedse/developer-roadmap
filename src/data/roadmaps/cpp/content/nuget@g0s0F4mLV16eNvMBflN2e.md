# NuGet

[NuGet](https://www.nuget.org/) is a Microsoft-supported package manager for the .NET framework, mainly used in C# and other .NET languages, but also supports C++ projects with `PackageReference`. It allows you to easily add, update, and manage dependencies in your projects.

### Installation

You can use NuGet either as a command-line tool or integrated in your preferred IDE like Visual Studio or Visual Studio Code. If you're using Visual Studio, it comes pre-installed. For other editors, you may need to download the command-line tool `nuget.exe`.

### Usage

You can use NuGet to manage your C++ dependencies using the PackageReference format in vcxproj files:

- Tools > NuGet Package Manager > Manage NuGet Packages for Solution…
- Package source should be set to "nuget.org"
- Select the Projects tab
- Use the search box to find packages

For example, to install a package called "PackageName" for all configurations:

```xml
<Project>
  <ItemGroup>
    <PackageReference Include="PackageName" Version="1.0.0" />
  </ItemGroup>
  ...
</Project>
```

### NuGet Command-Line

You can also use the command-line tool `nuget.exe` for more advanced scenarios or for specific needs.

Here's an example of installing a package using the command line:

```bash
nuget install PackageName
```

And updating a package:

```bash
nuget update PackageName
```

For more information and detailed examples on using NuGet in your projects, please refer to the [official documentation](https://docs.microsoft.com/en-us/nuget/guides/native-packages).