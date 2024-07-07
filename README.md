# Documentation
* Fake Store
    - A single-page application (SPA) built with React, Tailwind CSS, and TypeScript to display a list of products from Fake Store API.

## Project setup

* Project Initialized using React,Typescript and Tailwind

First install react with typescript using vite
```
npm create vite@latest <project_name> react-ts
```

Then install Tailwind
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
And add other required Tailwind configuration files.

Run Project using
```
npm run dev
```

* Used Axios to fetch data from API - "https://fakestoreapi.com/"

## Dependencies
* Used "React Lazy Load Image Component" for better performance and optimization.
* Used "axios" for faster data fetching because it escapes an extra step of json parsing.
* Used "react-toastify" for comprehensive error handling and user feedback.
* Used "react-router-dom" for navigation.

### Features

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

## Run the application locally.

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/Alokray007/Fakestore.git
   cd Fakestore
```

2. Install dependencies:

```bash
    npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Running Tests
Unit tests:

```bash
npm run test
```

5. Deployment
The application is automatically deployed to Netlify via the CI/CD pipeline. Make sure to set up the necessary secrets in your GitHub repository.

6. CI/CD Pipeline
The CI/CD pipeline is configured using GitHub Actions. It runs on every push request to the main branch and new release is published, executing tests, building the project, and deploying to Netlify.

7. Project Structure
* src/components: Reusable UI components
* src/context: Context API.
* src/data: Data in JSON format.
* src/pages: Page components
* src/services: API services
* src/types: TypeScript types
* src/App.tsx: Main application component
* src/Main.tsx: Entry point

8. Author
[Alok Suman](https://portfolio-alok1.netlify.app/)
[GitHub](https://github.com/Alokray007)
[LinkedIn](https://www.linkedin.com/in/aloksuman010)
