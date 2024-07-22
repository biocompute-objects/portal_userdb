# Contributing to the Biocompute Project

Thank you for considering contributing to the Biocompute project! This document outlines the process to help you contribute.

## Table of Contents

- [Code of Conduct](docs/contributing/code_of_code.md)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Submitting Code Changes](#submitting-code-changes)
- [Development Setup](#development-setup)
- [Style Guides](#style-guides)
  - [Code Style](#code-style)
  - [Commit Messages](#commit-messages)
- [Testing](#testing)
- [Documentation](#documentation)
- [License](#license)

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](docs/contributing/code_of_conduct.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [hadleysemail.com](mailto:email@example.com).

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with the following information:

- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected and actual behavior.
- Screenshots or logs, if applicable.
- Any other information that might be helpful.

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. Provide the following:

- Use a clear and descriptive title for the issue.
- A detailed explanation of the enhancement and why it would be useful.
- Any relevant examples or references.

### Submitting Code Changes

1. Fork the repository.
2. Create a new branch from `main` (e.g., `feature-branch`).
3. Make your changes.
4. Ensure your code adheres to the [code style](docs/contributing/style_guides.md).
5. Commit your changes with a descriptive message.
6. Push your branch to your fork.
7. Create a pull request (PR) to the `main` branch of the original repository.

Please ensure your PR includes:

- A clear title and description of the change.
- References to any related issues (e.g., `Closes #123`).
- Necessary documentation updates.

## Development Setup

To set up a local development environment, follow the instructions in the [Development Setup](docs/contributing/development_setup.md) guide.

## Style Guides

### Code Style

Follow the existing code style. We use ESLint for JavaScript. Run `npm run lint` to check your code.

### Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Capitalize the first letter.
- No period at the end.
- Include references to issues and pull requests when relevant.

## Testing

Please add tests for your changes and ensure all existing tests pass. Run the tests with:

```sh
npm test
