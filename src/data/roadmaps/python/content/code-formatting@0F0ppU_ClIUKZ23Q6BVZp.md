# Code Formatting

Proper code formatting is crucial for readability and maintainability in Python. This guide outlines key formatting rules and provides resources for using popular tools to keep your code clean and consistent.

### Key Formatting Guidelines (PEP 8)

#### 1. Indentation
Use **4 spaces** per indentation level. Avoid using tabs.

#### 2. Line Length
- Limit code lines to a maximum of **79 characters**.
- Keep comments and docstrings under **72 characters**.

#### 3. Blank Lines
- Separate top-level functions and class definitions with **two blank lines**.
- Separate methods within a class with **one blank line**.

#### 4. Naming Conventions
- Use `snake_case` for function and variable names.
- Use `PascalCase` for class names.
- Use `UPPER_CASE` for constants.

#### 5. Whitespace
- Include spaces around operators.
- Add spaces after commas in lists, dictionaries, and function arguments.

### Popular Formatting Tools

Several tools can automatically enforce these guidelines across your codebase:

#### Black
Black is an opinionated code formatter that enforces strict style rules, ensuring your code is formatted consistently without any manual configuration.

#### YAPF (Yet Another Python Formatter)
YAPF formats Python code to be readable and configurable with different styles such as Google, Facebook, etc. It's more flexible than Black.

#### Ruff
Ruff is a fast linter, formatter, and code checker. It combines features like linting and formatting in one efficient tool.

---

### Visit the following resources to learn more:

- [@official@PEP 8 Style Guide](https://peps.python.org/pep-0008/)
- [@opensource@Black Documentation](https://black.readthedocs.io/en/stable/)
- [@opensource@YAPF GitHub Repository](https://github.com/google/yapf)
- [@article@Understanding Python Code Formatters](https://deepsource.com/blog/python-code-formatters)
- [@article@Comparing Python Code Formatters](https://blog.frank-mich.com/python-code-formatters-comparison-black-autopep8-and-yapf/)
- [@official@Ruff Documentation](https://beta.ruff.rs/docs/)
