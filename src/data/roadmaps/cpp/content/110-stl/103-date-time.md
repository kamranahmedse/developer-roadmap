# C++ Date Time

In C++, you can work with dates and times using the `chrono` library, which is part of the Standard Library (STL). The `chrono` library provides various data types and functions to represent and manipulate time durations, time points, and clocks.

## Duration

A `duration` represents a span of time, which can be expressed in various units such as seconds, minutes, hours, etc. To create a duration, use the `std::chrono::duration` template class. Common predefined duration types are:

- `std::chrono::seconds`
- `std::chrono::minutes`
- `std::chrono::hours`

**Example:**

```cpp
#include <iostream>
#include <chrono>

int main() {
    std::chrono::seconds sec(5);
    std::chrono::minutes min(2);
    std::chrono::hours hr(1);
    return 0;
}
```

## Time Point

A `time_point` represents a specific point in time. It is usually created using a combination of duration and a clock. In C++, there are three clock types provided by the `chrono` library:

- `std::chrono::system_clock`: Represents the system-wide real time wall clock.
- `std::chrono::steady_clock`: Represents a monotonic clock that is guaranteed to never be adjusted.
- `std::chrono::high_resolution_clock`: Represents the clock with the shortest tick period.

**Example:**

```cpp
#include <iostream>
#include <chrono>

int main() {
    std::chrono::system_clock::time_point tp = std::chrono::system_clock::now();
    return 0;
}
```

## Clock

A clock provides access to the current time. It consists of the following elements:

- `time_point`: A specific point in time.
- `duration`: The time duration between two time points.
- `now()`: A static function that returns the current time point.

**Example:**

```cpp
#include <iostream>
#include <chrono>

int main() {
    // Get the current time_point using system_clock
    std::chrono::system_clock::time_point now = std::chrono::system_clock::now();

    // Get the time_point 1 hour from now
    std::chrono::system_clock::time_point one_hour_from_now = now + std::chrono::hours(1);
    return 0;
}
```

## Converting Time Points to Calendar Time

To convert a time point to calendar representation, you can use the `std::chrono::system_clock::to_time_t` function.

**Example:**

```cpp
#include <iostream>
#include <chrono>
#include <ctime>

int main() {
    std::chrono::system_clock::time_point now = std::chrono::system_clock::now();
    std::time_t now_c = std::chrono::system_clock::to_time_t(now);
    std::cout << "Current time: " << std::ctime(&now_c) << '\n';
    return 0;
}
```

This summarizes the basic functionality of working with date and time in C++ using the `chrono` library. You can find more advanced features, such as casting durations and time arithmetic, in the [C++ reference](https://en.cppreference.com/w/cpp/chrono).
