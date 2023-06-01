# Catch2

Catch2 is a modern, C++-native, test framework for unit tests, TDD, and BDD. It is a single-header library, meaning you only need to include one header file (`catch.hpp`) to start using it. Catch2 is fast, easy to use, and supports various test styles.

## Features

- **Single-header:** Just `#include "catch.hpp"` and start writing tests.
- **Test cases:** Declare test cases using the `TEST_CASE` macro.
- **Sections:** Divide test cases into sections using `SECTION` macro.
- **BDD:** Behavior-Driven Development style supported with `SCENARIO`, `GIVEN`, `WHEN`, `THEN`.
- **Matchers:** Use rich built-in matchers for more expressive assertions.
- **Test discovery:** Catch2 automatically discovers your test cases and sections.

## Code examples

### Basic test case

```cpp
#define CATCH_CONFIG_MAIN  // Tells Catch to provide a main() function
#include "catch.hpp"

int add(int a, int b) {
    return a + b;
}

TEST_CASE("Addition") {
    REQUIRE(add(2, 3) == 5);
}
```

### Sections

```cpp
TEST_CASE("Sections example") {
    int a = 1;

    SECTION("incrementing a") {
        a++;
        REQUIRE(a == 2);
    }

    SECTION("decrementing a") {
        a--;
        REQUIRE(a == 0);
    }
}
```

### BDD style

```cpp
SCENARIO("vector can be sized and resized", "[vector]") {
    std::vector<int> v;

    GIVEN("A vector with some items") {
        v.push_back(1);
        v.push_back(2);
        v.push_back(3);

        REQUIRE(v.size() == 3);

        WHEN("the size is increased") {
            v.resize(5);

            THEN("the size and contents change") {
                REQUIRE(v.size() == 5);
                REQUIRE(v[3] == 0);
                REQUIRE(v[4] == 0);
            }
        }
        WHEN("the size is reduced") {
            v.resize(2);

            THEN("the size changes but not the contents") {
                REQUIRE(v.size() == 2);
                REQUIRE(v[0] == 1);
                REQUIRE(v[1] == 2);
            }
        }
    }
}
```

### Matchers

```cpp
TEST_CASE("Matchers example") {
    std::string str = "Hello, world!";

    CHECK_THAT(str, Catch::Matchers::StartsWith("Hello"));
    CHECK_THAT(str, Catch::Matchers::EndsWith("world!"));
    CHECK_THAT(str, Catch::Matchers::Contains("lo, wo"));
}
```

For more information, visit the [Catch2 GitHub repository](https://github.com/catchorg/Catch2).