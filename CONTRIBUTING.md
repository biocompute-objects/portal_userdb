# Contributing to the Biocompute Project

Thank you for considering contributing to the Biocompute project! This document outlines the process to help you contribute.

All types of contributions are encouraged and valued. See the Table of Contents for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues
  
## Table of Contents

- [Code of Conduct](./docs/contributing/code_of_code.md)
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

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](https://github.com/biocompute-objects/portal_userdb/blob/ContributionDoc/README.md).

Before you ask a question, it is best to search for existing [Issues](https://github.com/biocompute-objects/portal_userdb/tree/ContributionDoc/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/biocompute-objects/portal_userdb/tree/ContributionDoc/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.
## How to Contribute

### Reporting Bugs

#### Before Submitting a Bug Report
A good bug report shouldn’t leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.
If you find a bug, please create an issue on GitHub with the following information:

- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected and actual behavior.
- Screenshots or logs, if applicable.
- Any other information that might be helpful.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Biocompute project, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->
#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://github.com/biocompute-objects/portal_userdb/blob/ContributionDoc/README.md) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/biocompute-objects/portal_userdb/tree/ContributionDoc/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

<!-- omit in toc -->
#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/biocompute-objects/portal_userdb/tree/ContributionDoc/issues).Provide the following:

- Use a clear and descriptive title for the issue.
- A detailed explanation of the enhancement and why it would be useful.
- Any relevant examples or references.

### Submitting Code Changes

1. Fork the repository.
2. Create a new branch from `Development` (e.g., `feature-branch`).
3. Make your changes.
4. Ensure your code adheres to the [code style](docs/contributing/style_guides.md).
5. Commit your changes with a descriptive message.
6. Push your branch to your fork.
7. Create a pull request (PR) to the `Development` branch of the original repository.

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
