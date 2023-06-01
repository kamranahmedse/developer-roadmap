# CMake

CMake is a powerful cross-platform build system that generates build files, Makefiles, or workspaces for various platforms and compilers. Unlike the others build systems, CMake does not actually build the project, it only generates the files needed by build tools. CMake is widely used, particularly in C++ projects, for its ease of use and flexibility.

## CMakeLists.txt

CMake uses a file called `CMakeLists.txt` to define settings, source files, libraries, and other configurations. A typical `CMakeLists.txt` for a simple project would look like:

```cmake
cmake_minimum_required(VERSION 3.0)

project(MyProject)

set(SRC_DIR "${CMAKE_CURRENT_LIST_DIR}/src")
set(SOURCES "${SRC_DIR}/main.cpp" "${SRC_DIR}/file1.cpp" "${SRC_DIR}/file2.cpp")

add_executable(${PROJECT_NAME} ${SOURCES})

target_include_directories(${PROJECT_NAME} PRIVATE "${CMAKE_CURRENT_LIST_DIR}/include")

set_target_properties(${PROJECT_NAME} PROPERTIES
    CXX_STANDARD 14
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
)
```

## Building with CMake

Here is an example of a simple build process using CMake:

- Create a new directory for the build.

```sh
mkdir build
cd build
```

- Generate build files using CMake.

```sh
cmake ..
```

In this example, `..` indicates the parent directory where `CMakeLists.txt` is located. The build files will be generated in the `build` directory.

- Build the project using the generated build files.

```sh
make
```

Or, on Windows with Visual Studio, you may use:

```sh
msbuild MyProject.sln
```

CMake makes it easy to manage large projects, define custom build configurations, and work with many different compilers and operating systems. Making it a widely chosen tool for managing build systems in C++ projects.