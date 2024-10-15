# Crow Cpp

Crow is a C++ framework for creating HTTP or Websocket web services. It uses routing similar to Python's Flask which makes it easy to use. It is also extremely fast, beating multiple existing C++ frameworks as well as non-C++ frameworks.

## Key Features

 - Static File Serving Crow can serve static files (e.g., HTML, CSS, JS) directly, making it easy to create full-fledged web applications without needing a separate static file server.
 - Easy Routing (similar to Flask).
 - Type-safe handlers.
 - Built in JSON support.
 - [Mustache](http://mustache.github.io/) based templating library (`crow::mustache`).
 - Header only library (single header file available).
 - Middleware support for extensions.
 - HTTP/1.1 and Websocket support.
 - Multi-part request and response support.
 - Uses modern C++ (11/14).

## Code Example

Here's a simple example of a "Hello, World!" application using Crow:

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

In this example, You need to have **Crow** installed, and the `crow.h` file should be available in your project folder or installed globally.

You then need to compile your code on your 
[Linux](setup/linux.md#compiling-your-project),
[MacOS](setup/macos.md#compiling-using-a-compiler-directly), or
[Windows](setup/windows.md#getting-and-compiling-crow) machine

After building your `.cpp` file and running the resulting executable, you should be able to access your endpoint at [http://localhost:18080](http://localhost:18080). Opening this URL in your browser will show a white screen with "Hello world" typed on it.
