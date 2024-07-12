# CI/CD Setup Explanation

## Overview
Continuous Integration and Continuous Deployment (CI/CD) is a software development practice where code changes are automatically built, tested, and deployed to production environments. This ensures rapid and reliable delivery of updates while maintaining code quality.

GitHub Actions
GitHub Actions is a powerful automation tool provided by GitHub that allows you to build, test, and deploy your code directly from your repository. It uses YAML-based workflows to define these automated processes.

Workflow File: .github/workflows/build-test-deploy.yml

```yaml
name: CI/CD for React App

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  release:
    types: [published]

env:
  CI: false
```

## Triggers
  * Push: This workflow triggers whenever there is a push event to the main branch. This ensures that changes made to the main branch are automatically processed.
  * Pull: This workflow triggers whenever there is a pull event to the main branch. This ensures that changes proposed in pull requests are automatically processed, allowing for testing and verification before merging into the main branch.
  * Release: The workflow also triggers on new releases. When a new release is published, the workflow can automatically deploy the     updated code.

```yaml
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload production-ready build files
        uses: actions/upload-artifact@v4
        with:
          name: production-files
          path: ./dist
```

## Jobs and Steps

### Build Job
* Build Job: Runs on an Ubuntu environment (ubuntu-latest) and employs a matrix strategy to test with different Node.js versions (20.x).
  * Checkout code: Checks out the repository code into the runner.
  * Use Node.js: Sets up the specified Node.js version for the build.
  * Install dependencies: Installs project dependencies using npm install.
  * Build project: Executes the build process for the React application using npm run build.
  * Upload production-ready build files: Uses actions/upload-artifact to store the build artifacts (./dist) for later deployment.

```yaml
test:
    name: Test
    runs-on: ubuntu-latest
    needs: build

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Download production-ready build files
        uses: actions/download-artifact@v4
        with:
          name: production-files
          path: ./dist

      - name: Run tests
        run: npm test -- --coverage
```

### Test Job
* Test Job: Runs on an Ubuntu environment (ubuntu-latest), employs a matrix strategy to test with different Node.js versions (20.x) and and depends on the successful completion of the build job (needs: build).
  * Checkout code: Checks out the repository code into the runner.
  * Use Node.js: Sets up the specified Node.js version for the build.
  * Install dependencies: Installs project dependencies using npm install.
  * Download production-ready build files: Uses actions/download-artifact to retrieve the previously uploaded production build artifacts (production-files) from the build job.
  * Test production-ready build files: Runs unit test on react components and checks for all pass test cases.

```yaml
  deploy:
    name: Deploy to Netlify
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download production-ready build files
        uses: actions/download-artifact@v4
        with:
          name: production-files
          path: ./dist

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: ./dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Deployment Job
* Deploy Job: Runs on ubuntu-latest and depends on the successful completion of the test job (needs: test).
  * Download production-ready build files: Uses actions/download-artifact to retrieve the previously uploaded production build artifacts (production-files) from the build job.
  * Deploy to Netlify: Uses nwtgck/actions-netlify to deploy the production-ready build files to Netlify.
    * publish-dir: Specifies the directory containing the build files (./dist).
    * NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID: Environment variables fetched from GitHub Secrets for authentication and identification with Netlify.

## Conclusion:-
This CI/CD setup automates the build, test, and deployment processes for a React application using GitHub Actions. It ensures that changes to the main branch trigger automatic builds, test and deployments to Netlify, facilitating rapid and reliable software delivery.
