# Google Test (gtest)

Google Test, also known as gtest or googletest, is a C++ testing framework developed by Google. It provides a user-friendly API for writing test cases and is designed for use in a range of applications, from simple unit tests to complex system-level tests. 

## Getting Started with Google Test

To use Google Test in your project, follow these steps:

- Download the source code from the [GoogleTest GitHub repository](https://github.com/google/googletest).
- Build and install Google Test on your system. Instructions for various platforms can be found in the [README](https://github.com/google/googletest/blob/main/googletest/README.md) file.
- Include the necessary headers and link against the Google Test library in your project.

## Writing a Test with Google Test

Here's an example of how to write a simple test using Google Test:

- **Include the necessary headers**
   ```cpp
   #include "gtest/gtest.h"
   ```

- **Write the functions you want to test**

   Suppose we have a simple function to test:
   ```cpp
   int add(int a, int b) {
      return a + b;
   }
   ```

- **Write the test cases**

   To create a test case, use the `TEST()` macro, which takes two arguments: the test suite name and the test case name.

   ```cpp
   // Test the 'add' function.
   TEST(AdditionTest, PositiveNumbers) {
      EXPECT_EQ(3, add(1, 2));
      EXPECT_EQ(5, add(2, 3));
   }

   TEST(AdditionTest, NegativeNumbers) {
      EXPECT_EQ(-3, add(-1, -2));
      EXPECT_EQ(-5, add(-2, -3));
   }
   ```

- **Write a `main()` function**

   In order to run the tests, include a `main()` function that initializes Google Test and runs the tests.

   ```cpp
   int main(int argc, char **argv) {
      ::testing::InitGoogleTest(&argc, argv);
      return RUN_ALL_TESTS();
   }
   ```

- **Compile and run the tests**

   Compile your test program with the Google Test library and run the test executable.

## More Features

Google Test offers a wide range of features to make testing easier, such as:

- **Test Fixtures**: Test fixtures allow you to reuse the same set of objects for multiple tests. You can define a test fixture by creating a class that inherits from `::testing::Test` and writing setup and teardown methods.

- **Assertions**: Google Test provides a variety of assertion macros to help you verify your code's behavior. Some common ones include `EXPECT_EQ`, `EXPECT_TRUE`, `EXPECT_FALSE`, `ASSERT_EQ`, `ASSERT_TRUE`, and `ASSERT_FALSE`.

- **Parameterized Tests**: Google Test supports parameterized tests, allowing you to run the same test with different inputs easily.

- **Death Tests**: Google Test allows you to write tests that verify if your code terminates correctly or with the expected error message.

For more information about Google Test and its features, refer to the [official documentation](https://github.com/google/googletest/blob/main/docs/primer.md).
