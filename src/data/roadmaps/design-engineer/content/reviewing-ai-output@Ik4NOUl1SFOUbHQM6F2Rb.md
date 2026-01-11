# Reviewing AI-Generated Code

AI generates confident-sounding code that may contain bugs, security issues, or accessibility gaps. Critical review of AI output is a essential skill—never commit code you don't understand.

**What to Check**:

**Correctness**:
- Does it actually do what was requested?
- Are edge cases handled?
- Is the logic sound?

**Security**:
- Are there exposed secrets or credentials?
- Is user input properly sanitized?
- Are there XSS or injection vulnerabilities?

**Accessibility**:
- Are semantic HTML elements used correctly?
- Is keyboard navigation supported?
- Are ARIA attributes appropriate and correct?

**Performance**:
- Are there unnecessary re-renders?
- Is data fetching efficient?
- Are large dependencies being added?

**Maintainability**:
- Is the code readable and well-structured?
- Does it follow your project's patterns?
- Is it overly complex for the problem?

**Red Flags**:
- Code you can't explain
- Unfamiliar dependencies being added
- Complex solutions to simple problems
- Patterns that don't match your codebase

Visit the following resources to learn more:

- [@article@AI Code Quality - SonarSource](https://www.sonarsource.com/blog/ai-generated-code-quality/)
- [@article@Code Review Best Practices - Google](https://google.github.io/eng-practices/review/)
- [@video@AI Code Review](https://www.youtube.com/watch?v=q0e1xIqXraA)
