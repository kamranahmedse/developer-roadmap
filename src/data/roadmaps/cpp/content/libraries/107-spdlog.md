# Spdlog

`spdlog` is a fast, header-only, C++ logging library. It provides a simple and efficient way to add diagnostic logging to your C++ application.

### Features:
- Header-only, no need to build or link a library
- Highly configurable, including support for custom log sinks (e.g. writing to a file or a database)
- Asynchronous and synchronous logging modes
- Preprocessor-based format string checks to catch bugs at compile-time
- Easy to extend with custom formatters, sinks, and levels

### Usage example:

Include the `spdlog` header, create a logger object, and use it to log messages:

```cpp
#include "spdlog/spdlog.h"

int main() {
    // Create a logger with the name "example_logger"
    auto logger = spdlog::stdout_color_mt("example_logger");

    // Log messages with various severity levels
    logger->info("Welcome to spdlog!");
    logger->warn("Warning message");
    logger->error("Error message");

    return 0;
}
```

### Custom sink example:

Here's an example of creating a logger with a custom sink that writes to a text file:

```cpp
#include "spdlog/spdlog.h"
#include "spdlog/sinks/basic_file_sink.h"

int main() {
    // Create a file sink to write logs to "logs.txt"
    auto file_sink = std::make_shared<spdlog::sinks::basic_file_sink_mt>("logs.txt");

    // Create a logger with the file sink and the name "example_logger"
    auto logger = std::make_shared<spdlog::logger>("example_logger", file_sink);

    // Register the logger
    spdlog::register_logger(logger);

    // Log messages
    logger->info("Welcome to spdlog!");
    logger->warn("Warning message");
    logger->error("Error message");

    return 0;
}
```

For more examples and detailed documentation, visit the [spdlog GitHub repository](https://github.com/gabime/spdlog).