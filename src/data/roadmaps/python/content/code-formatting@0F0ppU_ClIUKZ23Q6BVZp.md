# Python Code Formatting Guidelines

Code formatting in Python is crucial for readability and maintainability. This guide outlines key formatting rules and tools to help you maintain clean and consistent code.

## Key Formatting Guidelines (PEP 8)

Adhering to PEP 8, the official Python style guide, is essential for writing clean and readable code. Below are the key formatting rules:

### 1. Indentation
- Use **4 spaces** per indentation level.
- Do **not** use tabs.

### 2. Line Length
- Limit all lines to a maximum of **79 characters** for code.
- Limit all lines to **72 characters** for comments and docstrings.

### 3. Blank Lines
- Use **two blank lines** to separate top-level functions and class definitions.
- Use **one blank line** to separate methods within a class and logical sections of code.

### 4. Naming Conventions
- Use `snake_case` for variable, function, and method names.
- Use `PascalCase` for class names.
- Use `UPPER_CASE` for constants.

### 5. Whitespace
- Use spaces around operators (e.g., `x = 10 + 5`).
- Add a space after commas in lists, dictionaries, or function arguments for better readability.

## Popular Formatting Tools

Several tools can automate the task of formatting Python code to conform to these standards:

### 1. Black
Black is an opinionated code formatter that automatically reformats code to follow a strict set of rules. It is known for its consistency and ease of use.

Install Black:
```bash
pip install black
```
Format your code with:
```bash
black your_code.py
```
### 2. YAPF (Yet Another Python Formatter)
YAPF is a code formatter that reformats Python code to make it more readable, while allowing more flexibility in customization compared to Black. It reformats code based on a style you can configure.

Install YAPF:
```bash
pip install yapf
```
Format your code with:
```bash
yapf -i your_code.py
```
### 3. Ruff
Ruff is a fast Python linter, formatter, and code checker. It aims to offer linting and some formatting capabilities similar to tools like flake8, but much faster. Ruff also integrates with tools like Black to provide additional checks.
Install Ruff:
```bash
pip install ruff
```
Lint and format your code with Ruff:
```bash
ruff check your_code.py --fix
```
Ruff supports various rules and configurations for linting, ensuring code adheres to the standards you specify.


## Resources

For more information on Python code formatting and tools, check out the following resources:

- [Top Code Formatting Tips for Python Developers](https://tecadmin.net/top-code-formatting-tips-for-python-developers)
- [Python Code Formatters Comparison: Black, autopep8, and YAPF](https://blog.frank-mich.com/python-code-formatters-comparison-black-autopep8-and-yapf/)
- [The Hitchhiker's Guide to Python: Code Style](https://docs.python-guide.org/writing/style/)
- [DeepSource's Guide to Python Code Formatters](https://deepsource.com/blog/python-code-formatters)
- [Stylising Your Python Code: An Introduction to Linting and Formatting](https://python-bloggers.com/2023/07/stylising-your-python-code-an-introduction-to-linting-and-formatting)

