# Conan

[Conan](https://conan.io/) is a popular package manager for C and C++ languages and is designed to be cross-platform, extensible, and easy to use. It allows developers to declare, manage, and fetch dependencies while automating the build process. Conan supports various build systems, such as CMake, Visual Studio, MSBuild, and more.

## Installation

To install Conan, you can use pip, the Python package manager:

```bash
pip install conan
```

## Basic Usage

- Create a `conanfile.txt` file in your project root directory, specifying dependencies you need for your project:

```ini
[requires]
boost/1.75.0

[generators]
cmake
```

- Run the `conan install` command to fetch and build required dependencies:

```bash
mkdir build && cd build
conan install ..
```

- Now build your project using your build system, for example CMake:

```bash
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build .
```

## Creating Packages

To create a package in Conan, you need to write a `conanfile.py` file with package information and build instructions.

Here's an example:

```python
from conans import ConanFile, CMake

class MyLibraryConan(ConanFile):
    name = "MyLibrary"
    version = "0.1"
    license = "MIT"
    url = "https://github.com/username/mylibrary"
    description = "A simple example library"
    settings = "os", "compiler", "build_type", "arch"
    generators = "cmake"

    def build(self):
        cmake = CMake(self)
        cmake.configure(source_folder="src")
        cmake.build()

    def package(self):
        self.copy("*.hpp", dst="include", src="src/include")
        self.copy("*.lib", dst="lib", keep_path=False)
        self.copy("*.dll", dst="bin", keep_path=False)
        self.copy("*.so", dst="lib", keep_path=False)
        self.copy("*.a", dst="lib", keep_path=False)

    def package_info(self):
        self.cpp_info.libs = ["MyLibrary"]
```

With that setup, you can create a package by running:

```bash
conan create . username/channel
```

This will compile the package and store it in your Conan cache. You can now use this package as a dependency in other projects.