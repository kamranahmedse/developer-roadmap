# Crow

Crow is a C++ framework for creating HTTP or WebSocket web services. It offers a routing system similar to Python's Flask, making it easy to use and highly performant. Crow stands out for its speed, often surpassing other C++ and non-C++ frameworks.

## Key Features

- **Static File Serving**: Crow can serve static files (e.g., HTML, CSS, JS) directly.
- **Easy Routing**: Simple routing system similar to Flask.
- **Type-safe Handlers**: Crow enforces type safety for request handlers.
- **Built-in JSON Support**: Native support for JSON serialization and deserialization.
- **Mustache Templating**: Uses Mustache-based templating library (`crow::mustache`).
- **Header-only Library**: A single-header library, making setup easy.
- **Middleware Support**: Extendable via middleware for custom functionality.
- **Supports HTTP/1.1 and WebSockets**: Compatible with both protocols.
- **Multi-part Requests**: Full support for handling multi-part requests and responses.
- **Modern C++ Standards**: Crow is built using modern C++ (11/14).

## Example

Below is a simple "Hello, World!" example using Crow:

```cpp
#include "crow.h"

int main()
{
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    app.port(18080).multithreaded().run();
}
```
To run this example, ensure you have Crow installed and `crow.h` available.

You can compile your project on [Linux](https://github.com/bikundkumar/Crow/blob/master/docs/getting_started/setup/linux.md), [MacOS](https://github.com/bikundkumar/Crow/blob/master/docs/getting_started/setup/macos.md), or [Windows](https://github.com/bikundkumar/Crow/blob/master/docs/getting_started/setup/windows.md).

Once compiled and executed, visit [http://localhost:18080](http://localhost:18080) to see "Hello world" displayed in your browser.

For more information and tutorials about Crow, you can refer to the [official Crow documentation](https://crowcpp.org/master/).
