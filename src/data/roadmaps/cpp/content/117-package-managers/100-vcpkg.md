# vcpkg

`vcpkg` is a cross-platform, open-source package manager for C and C++ libraries. Developed by Microsoft, it simplifies the process of acquiring and building open-source libraries for your projects. `vcpkg` supports various platforms including Windows, Linux, and macOS, enabling you to easily manage and integrate external libraries into your projects.

## Installation

To install `vcpkg`, follow these steps:

- Clone the repository:

   ```
   git clone https://github.com/Microsoft/vcpkg.git
   ```

- Change to the `vcpkg` directory and run the bootstrap script:

   - On Windows:
     
     ```
     .\bootstrap-vcpkg.bat
     ```

   - On Linux/macOS:

     ```
     ./bootstrap-vcpkg.sh
     ```

- (Optional) Add the `vcpkg` executable to your `PATH` environment variable for easy access.

## Basic usage

Here are some basic examples of using `vcpkg`:

- Search for a package:

  ```
  vcpkg search <package_name>
  ```

- Install a package:

  ```
  vcpkg install <package_name>
  ```

- Remove a package:

  ```
  vcpkg remove <package_name>
  ```

- List installed packages:

  ```
  vcpkg list
  ```

- Integrate `vcpkg` with Visual Studio (Windows only):

  ```
  vcpkg integrate install
  ```

For additional documentation and advanced usage, you can refer to the [official GitHub repository](https://github.com/microsoft/vcpkg).