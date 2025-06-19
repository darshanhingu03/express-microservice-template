# Express Microservice Boilerplate

A solid starting point for building scalable and maintainable Express microservices. This boilerplate is configured with modern JavaScript tools and best practices including ESLint, Prettier, Husky, lint-staged, and Jest for testing.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Configuration](#configuration)
  - [ESLint & Prettier](#eslint--prettier)
  - [Husky & lint-staged](#husky--lint-staged)
  - [Jest & Babel](#jest--babel)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This boilerplate provides a well-organized starting point for creating Express-based microservices. It integrates automated linting, code formatting, git hooks, and testing tools to enforce code quality and consistency from day one.

## Features

- **Express Server**: Quick start for building REST APIs.
- **ESLint & Prettier**: Consistent code style and formatting.
- **Husky & lint-staged**: Automate pre-commit hooks to run linting and tests.
- **Jest**: Out-of-the-box testing with Jest including both unit and integration tests.
- **Babel**: Transpile modern ECMAScript modules for Node.js, supporting ES modules.
- **Modular Structure**: Organized project structure for clear separation of concerns.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/express-microservice-template.git
    cd express-microservice-template
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Set up Husky:**

    Husky is configured to run on `pre-commit`. Install hooks by running:

    ```bash
    yarn husky install
    ```

    Ensure your `package.json` includes a prepare script:

    ```json
    "scripts": {
      "prepare": "husky install"
    }
    ```

## Project Structure

Below is an overview of the typical project structure:


├── src/ # All application code lives here
│ ├── config/ # Environment variables and configuration
│ ├── controllers/ # Route handler functions (controller layer)
│ ├── routes/ # Express routers (route definitions)
│ ├── models/ # Sequelize models (database schema)
│ ├── services/ # Business logic and reusable service functions
│ ├── middlewares/ # Custom Express middlewares (auth, error handler, etc.)
│ ├── utils/ # Utility functions/helpers
│ ├── validations/ # Request validations using Joi/Yup/Zod
│ └── app.js # Main Express app (sets up middleware and routes)
│
├── test/ # Automated tests
│ ├── unit/ # Unit tests (small scope logic)
│ └── integration/ # Integration/API tests (routes + DB)
│
├── .husky/ # Git hooks managed by Husky
│ └── pre-commit # Hook that runs lint-staged checks
│
├── .env # Environment-specific variables
├── .gitignore # Ignored files/folders in git
├── babel.config.mjs # Babel setup for ES modules in Node.js
├── eslint.config.js # ESLint configuration (flat config format)
├── jest.config.js # Jest configuration (if needed separately)
├── package.json # Project dependencies and scripts
├── yarn.lock # Yarn lock file for exact dependency versions
└── README.md # You're reading it!


## Scripts

The following scripts are available:

- **Start the Server**

    ```bash
    yarn start
    ```

- **Run in Development Mode**

    ```bash
    yarn dev
    ```

- **Run Tests**

    ```bash
    yarn test
    ```

- **Lint Files**

    ```bash
    yarn lint
    ```

- **Check Code Format**

    ```bash
    yarn format:check
    ```

## Configuration

### ESLint & Prettier

- **ESLint:** The linting rules are set up in `eslint.config.js`, enforcing coding standards including naming conventions.  
- **Prettier:** Code is automatically formatted via Prettier during commits when run through lint-staged.

Both tools are integrated with Husky and lint-staged so that any pushed code meets the defined quality and style guidelines.

### Husky & lint-staged

Husky is used to create Git hooks which call lint-staged. For example, a pre-commit hook is created in `.husky/pre-commit` containing:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
