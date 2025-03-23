# Package Managers

Package managers are tools that automate the process of installing, upgrading, and managing software (libraries, frameworks, and other dependencies) for a programming language, such as C++.

Some popular package managers used in the C++ ecosystem include:

- **Conan**
- **vcpkg**
- **C++ Archive Network (cppan)**

## Conan

[Conan](https://conan.io/) is an open-source, decentralized, cross-platform package manager for C and C++ developers. It simplifies managing dependencies and reusing code, which benefits multi-platform development projects.

For example, installing a library using Conan:

```sh
conan install poco/1.9.4@
```

## vcpkg

[vcpkg](https://github.com/microsoft/vcpkg) is a cross-platform package manager created by Microsoft. It is an open-source library management system for C++ developers to build and manage their projects.

For example, installing a package using vcpkg:

```sh
./vcpkg install boost:x64-windows
```

## C++ Archive Network (cppan)

[cppan](https://cppan.org/) is a package manager and software repository for C++ developers, simplifying the process of managing and distributing C++ libraries and tools. It's now part of [build2](https://build2.org/), a build toolchain that provides a package manager.

An example of a `cppan.yml` file:

```yaml
#
# cppan.yml
#

project:
  api_version: 1

  depend:
    - pvt.cppan.demo.sqlite3
    - pvt.cppan.demo.xz_utils.lzma
```

With these package managers, you can streamline your development process and easily manage dependencies in your C++ projects. In addition, you can easily reuse the code in your projects to improve code quality and accelerate development.