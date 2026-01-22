# Contributing to Blockchain-Secured-Audit-Log

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Blockchain-Secured-Audit-Log.git
   cd Blockchain-Secured-Audit-Log
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/orgito1015/Blockchain-Secured-Audit-Log.git
   ```

## Development Setup

Navigate to the implementation directory:

```bash
cd implementation/secure-auditchain
```

Install dependencies:

```bash
npm install
```

Verify your setup:

```bash
npm run lint    # Run linter
npm run build   # Compile TypeScript
npm test        # Run tests
```

## Making Changes

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our [code style guidelines](#code-style)

3. Add tests for your changes when applicable

4. Ensure all tests pass:
   ```bash
   npm test
   ```

5. Verify the build succeeds:
   ```bash
   npm run build
   ```

## Testing

We use Vitest for testing. Tests are located in the `test/` directory.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Place test files in the `test/` directory
- Name test files with `.test.ts` extension
- Follow the existing test structure
- Aim for meaningful test descriptions
- Test both success and failure cases

Example test structure:

```typescript
import { describe, it, expect } from "vitest";
import { yourFunction } from "../src/module.js";

describe("YourModule", () => {
  it("does something correctly", () => {
    const result = yourFunction();
    expect(result).toBe(expected);
  });
});
```

## Code Style

### General Guidelines

- Use TypeScript for all source code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

### TypeScript

- Enable strict type checking
- Avoid using `any` type
- Use interfaces and types appropriately
- Export types that are used across modules

### Formatting

We use ESLint for code linting:

```bash
npm run lint
```

### Commit Messages

- Use clear and descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 72 characters
- Add more details in the commit body if needed

Examples:
```
Add support for custom hash algorithms
Fix signature verification bug for edge cases
Update README with installation instructions
```

## Submitting Changes

1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a Pull Request (PR) on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Describe what changes you made and why
   - List any breaking changes

3. Wait for review:
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Once approved, your PR will be merged

## Questions?

If you have questions or need help, feel free to:
- Open an issue on GitHub
- Start a discussion in the Discussions tab

## Code of Conduct

Please note that this project follows a Code of Conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive criticism
- Accept responsibility and apologize for mistakes
- Focus on what is best for the community

Thank you for contributing to Blockchain-Secured-Audit-Log!
