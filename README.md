# Documentation

# Table of contents
[Overview](#Overview)
  - [Features](#Features)
  - [Prerequisites](#Prerequisites)
  - [Installation](#Installation)
  - [Project Structure](#Project-Structure)
  - [Scripts](#Scripts)
  - [Dependencies](#Dependencies)
    -[Production Dependencies](#Production-Dependencies)
    -[Development Dependencies](#Development-Dependencies)
  - [Running the Application Locally](#Running-the-Application-Locally)
  - [Links](#Links)
  - [Additional Documentation](#Additional-Documentation)
  - [Resources](#Resources)
  - [Additional Notes](#Additional-Notes)
  - [Author](#Author)
  - [License](#License)
  - [Conclusion](#Conclusion)

## Overview

A single-page application (SPA) built using vite with React, Tailwind CSS, and TypeScript to display a list of products from Fake Store API. The application leverages various libraries and tools for state management, routing, HTTP requests, and testing. This documentation provides a detailed explanation of the project setup, dependencies, and instructions on how to run the application locally.

## Features

- Display products in a grid or list format
- Filter products by category
- Pagination or infinite scrolling
- Product details page
- Shopping cart functionality
- Search functionality
- Advanced filtering and sorting options
- Persist shopping cart state using local storage
- Unit testing
- CI/CD pipeline with GitHub Actions
- Performance optimizations
- Accessibility improvements
- Used Axios to fetch data from API - "https://fakestoreapi.com/"

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:
* Node.js (>= 16.x)
* npm (>= 6.x)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Alokray007/Fakestore.git
cd fakestore
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

The project structure is organized as follows:

```php
fakestore/
├── src/
│   ├── components/    # React components
│   ├── pages/         # React pages
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│   ├── index.css      # Global styles
│   ├── assets         # assets - img, svg
│   ├── context        # Context API
│   ├── data           # static data
│   ├── index.css      # Global styles
│   └── vite-env.d.ts  # vite environment for Jest
├── public/            # Static assets
├── coverage/          # SCode Coverage Reports
├── jest.config.js     # Jest configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
├── CICD-Confid.md     # CICD configuration
├── CICD-Setup.md      # CICD Setup
├── Test-Setup.md      # Test Setup
├── index.html         # Index file configuration
├── LICENSE            # MIT License details
├── postcss.config.js  # Postcss Configuration
├── test.report.html   # HTML test reports
└── tailwind.config.js # Tailwind CSS configuration

```
## Scripts

* `npm run dev`: Starts the development server using Vite.
* `npm run test`: Runs the test suite using Jest.
* `npm run build`: Compiles the TypeScript code and builds the application using Vite.
* `npm run lint`: Lints the codebase using ESLint.
* `npm run preview`: Serves the production build for preview.

## Dependencies

### Production Dependencies
  * axios: HTTP client for making API requests.
  * react: JavaScript library for building user interfaces.
  * react-dom: Entry point to the DOM and server renderers for React.
  * react-lazy-load-image-component: Lazy loading for images.
  * react-router-dom: Declarative routing for React applications.
  * react-toastify: Notification library for React.

### Development Dependencies
  * @tailwindcss/forms: Tailwind CSS plugin for styling form elements.
  * @testing-library/jest-dom: Custom jest matchers for testing DOM nodes.
  * @testing-library/react: React testing utilities.
  * @testing-library/user-event: Library to simulate user events.
  * @types/: TypeScript type definitions for various libraries.
  * @typescript-eslint/eslint-plugin: ESLint plugin for TypeScript.
  * @typescript-eslint/parser: TypeScript parser for ESLint.
  * @vitejs/plugin-react: Official Vite plugin for React.
  * autoprefixer: PostCSS plugin to parse CSS and add vendor prefixes.
  * axios-mock-adapter: Axios adapter for mocking requests in tests.
  * eslint: Pluggable linting utility for JavaScript and TypeScript.
  * eslint-plugin-react-hooks: ESLint rules for React Hooks.
  * eslint-plugin-react-refresh: ESLint plugin for React Fast Refresh.
  * file-loader: Webpack loader for file assets.
  * identity-obj-proxy: Proxy for mocking CSS modules in tests.
  * jest: JavaScript testing framework.
  * jest-environment-jsdom: Jest environment for testing with jsdom.
  * jest-transformer-svg: Jest transformer for SVG files.
  * msw: Mock Service Worker for API mocking.
  * postcss: Tool for transforming CSS with JavaScript plugins.
  * tailwindcss: Utility-first CSS framework.
  * ts-jest: Jest transformer for TypeScript.
  * ts-node: TypeScript execution environment and REPL for Node.js.
  * typescript: TypeScript language and compiler.
  * vite: Next-generation front-end tooling.
  * vite-tsconfig-paths: Vite plugin for TypeScript path mapping.
  * jest-html-reporter: TO generate HTML reportes


## Running the Application Locally

1. Start the development server:

``` bash
npm run dev
```

This will start the Vite development server and open the application in your default web browser. The server will automatically reload when changes are made to the source files.

2. Running Tests:

```bash
npm run test
```

This will execute the test suite using Jest. setup details is available in the Test-Setup.md file.

3. Linting the Codebase:

```bash
npm run lint
```

This will lint the codebase using ESLint according to the specified rules in the configuration.

4. Building the Application:

```bash
npm run build
```

This will compile the TypeScript code and build the application for production using Vite.

5. Previewing the Production Build:

```bash
npm run preview
```

This will serve the production build of the application for preview.

6. Deployment:

The application is automatically deployed to Netlify via the CI/CD pipeline. Make sure to set up the necessary secrets in your GitHub repository.

7. CI/CD Pipeline:

The CI/CD pipeline is configured using GitHub Actions. It runs on every push request to the main branch, Pull Request to main branch and new release is published, executing tests, building the project, and deploying to Netlify.
* Addition details are Provided in CICD-Config.md and CICD-Setup.md files for CI-CD Pipeline.

## Links

- Solution URL: [Github](https://github.com/Alokray007/Fakestore)
- Live Site URL: [Netlify- Live Site](https://fakestorenew.netlify.app/)

## Additional Documentation
- CI/CD Pipeline:
  - Config File:  [Config](CICD-Config.md)
  - Setup File:  [Setup](CICD-Setup.md)
- Test Setup File:  [Test](Test-Setup.md)
- Test Reports
  - Code Coverage Reports:  `Private`
  - HTML test reports:  `Private`


## Resources
* www.google.com
* www.stackoverflow.com
* [Jest with Vite](https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48)

## Additional Notes

* API Integration: The project uses axios for making HTTP requests. The API service configurations are located in the src/services directory.
* Styling: Tailwind CSS is used for styling the components. The configuration file is tailwind.config.js.
* Testing: Jest and React Testing Library are used for writing and running tests. Mocking is handled using axios-mock-adapter and msw.
* TypeScript: The project is written in TypeScript. Type definitions are included for better development experience and type safety.

## Author

[Alok Suman](https://portfolio-alok1.netlify.app/)

[GitHub](https://github.com/Alokray007)

[LinkedIn](https://www.linkedin.com/in/aloksuman010)

## Licence
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/license/MIT).

## Conclusion

This documentation provides an overview of the FakeStore project setup, dependencies, and instructions for running the application locally. For further information or troubleshooting, refer to the individual library documentation or contact the project maintainers.
