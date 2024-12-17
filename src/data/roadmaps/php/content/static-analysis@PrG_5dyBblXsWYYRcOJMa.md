# Static Analysis

Static analysis in PHP is a method to inspect the source code before running it. Rather than testing programs on specific inputs (dynamic analysis), static analysis focuses on finding potential issues within code without executing it. It can help in identifying common coding mistakes and uncovering complex problems like dependency issues, unused variables, undeclared properties, and more. Using tools such as PHPStan or Psalm provides this static analysis feature in PHP. For instance, using PHPStan involves merely installing it via Composer and running it against your codebase.

```bash
composer require --dev phpstan/phpstan
./vendor/bin/phpstan analyse src
```

It outputs information about any issues it finds in code. However, to reap the full benefits, understand that these tools require proper configuration and regular usage.

Visit the following resources to learn more:

- [@official@PHP Stan](https://phpstan.org/)
- [@official@PHP Stan - Getting Started](https://phpstan.org/user-guide/getting-started)
