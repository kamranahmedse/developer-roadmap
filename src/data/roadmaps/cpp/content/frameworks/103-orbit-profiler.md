# Orbit Profiler

Orbit Profiler is a performance profiler for C++ applications. It is designed to provide developers with real-time feedback on their application's performance and help them identify performance bottlenecks. It supports both Windows and Linux platforms, profiling both local and remote processes.

**Major features of Orbit Profiler:**

- Sampling-based profiling
- Instrumentation-based profiling
- Callstacks collection
- Frame-based measurements using scopes macros

## Usage

- **Include OrbitProfiler.h**: First, you need to include the `OrbitProfiler.h` header file in your project:

   ```cpp
   #include "OrbitProfiler.h"
   ```

- **Starting and Stopping the profiler**: Use `ORBET_START` and `ORBIT_STOP` to start and stop the profiler.

   ```cpp
   ORBIT_START();
   // Your application code here
   ORBIT_STOP();
   ```

- **Instrumenting scopes**: Use the `ORBET_SCOPE` macro to annotate the scope of the function you want to measure:

   ```cpp
   void ExampleFunction() {
     ORBIT_SCOPE("Example Function");
     // Function content here
   }
   ```

- **Visualizing the captured data**: Orbit Profiler provides a **Session View** that displays the captured data and allows you to navigate through the timeline, analyze data, and identify performance bottlenecks.

## Example

For demonstration purposes, consider the following example of a simple C++ application:

```cpp
#include "OrbitProfiler.h"

void FunctionA() {
  ORBIT_SCOPE("Function A");
  // Function A code here
}

void FunctionB() {
  ORBIT_SCOPE("Function B");
  // Function B code here
}

int main() {
  ORBIT_START();

  FunctionA();
  FunctionB();

  ORBIT_STOP();
  return 0;
}
```

By using Orbit Profiler, we are able to pinpoint performance issues in FunctionA and FunctionB and optimize our application accordingly.

For more information, refer to the [official Orbit Profiler GitHub repository](https://github.com/google/orbit).