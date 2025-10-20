# Commit Message Generation Guide

## Overview

This guide provides instructions on how to generate clear, descriptive, and consistent commit messages by analyzing staged changes.

## Before You Commit

### 1. Review Staged Changes

Before writing your commit message, always review what you're about to commit:

```bash
git diff --staged
```

Or for a more concise view:

```bash
git diff --staged --stat
```

### 2. Understand the Scope

Take a moment to understand:

- **What files are being changed?**
- **What is the purpose of these changes?**
- **Are there multiple logical groups of changes?**

If you find unrelated changes mixed together, consider splitting them into separate commits:

```bash
git add <specific-files>
git commit -m "message"
```

## Commit Message Format

### Structure

Follow this format for all commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Use one of the following types to categorize your changes:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes only
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Changes that improve performance
- **test**: Adding or updating tests
- **chore**: Changes to build system, dependencies, or other non-code files
- **ci**: Changes to CI/CD configuration

### Scope

The scope specifies what part of the codebase is affected:

- Examples: `roadmap`, `ui`, `api`, `scripts`, `ci`, `docs`
- Should be optional but highly recommended
- Keep it concise (1-3 words)

### Subject

The subject is a brief description of the change:

- **Use imperative mood**: "add feature" not "added feature"
- **Don't capitalize the first letter**
- **Don't end with a period**
- **Limit to 50 characters**

### Body

The body provides detailed explanation:

- **Wrap at 72 characters**
- **Separate from subject with a blank line**
- **Explain WHY the change was made, not WHAT**
- **Use bullet points for multiple changes**
- **Reference issue numbers**: "Fixes #123" or "Closes #456"

### Footer

Include metadata:

- Breaking changes: `BREAKING CHANGE: description`
- Related issues: `Refs #123, #456`
- Co-authors: `Co-authored-by: Name <email@example.com>`

## Examples

### Simple commit (small change)

```
fix(roadmap): correct typo in navigation text
```

### Feature with body

```
feat(editor): add live preview for roadmap changes

Implement a real-time preview panel that updates as users modify
roadmap content. This allows users to see changes immediately
without having to save and refresh.

- Add preview component
- Connect to state management
- Add keyboard shortcut (Ctrl+Shift+P)

Fixes #245
```

### Breaking change

```
refactor(api): change authentication header format

BREAKING CHANGE: The authentication header format has changed from
`Authorization: Bearer token` to `X-API-Key: token`. All clients
must update their requests accordingly.

Refs #890
```

## Workflow

### Step-by-Step Process

1. **Make your changes** and test them locally
2. **Stage your changes**:
   ```bash
   git add .
   # or selectively
   git add <file1> <file2>
   ```
3. **Review staged changes**:
   ```bash
   git diff --staged
   ```
4. **Check file statistics**:
   ```bash
   git diff --staged --stat
   ```
5. **Generate the commit message** following the format above
6. **Commit your changes**:
   ```bash
   git commit -m "type(scope): subject"
   ```
   Or for multi-line messages:
   ```bash
   git commit
   # Editor opens for full message with body and footer
   ```

## Tips for Better Commit Messages

### ✅ Do's

- ✅ Commit related changes together
- ✅ Write descriptive, meaningful messages
- ✅ Reference issue numbers when applicable
- ✅ Explain the "why" in the body
- ✅ Use consistent formatting
- ✅ Keep commits atomic and focused

### ❌ Don'ts

- ❌ Avoid generic messages like "update files" or "fix bugs"
- ❌ Don't mix unrelated changes in one commit
- ❌ Don't write commit messages in past tense
- ❌ Don't include implementation details in the subject
- ❌ Don't forget to reference related issues
- ❌ Don't commit incomplete work

## Checking Staged Changes Before Committing

Use these commands to review your staged changes:

```bash
# See all staged changes with diff
git diff --staged

# See only the files that changed
git diff --staged --name-only

# See statistics (insertions/deletions count)
git diff --staged --stat

# See staged changes for a specific file
git diff --staged <filename>

# Interactive staging to review line-by-line
git add -p
```

## Git Aliases for Convenience

Add these to your Git config for faster access:

```bash
git config --global alias.staged 'diff --staged'
git config --global alias.stagedstat 'diff --staged --stat'
git config --global alias.review 'diff --staged'
```

Then use:

```bash
git staged      # See all staged changes
git stagedstat  # See file statistics
git review      # Review changes before committing
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Commit Best Practices](https://tbaggery.com/writing-good-commit-messages.html)
- [Official Git Documentation](https://git-scm.com/doc)

---

**Remember**: A well-written commit message is a gift to future developers (including yourself)!
