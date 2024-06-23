### Project setup

## Project Initialization using React,Typescript and Tailwind
First install react with typescript using vite
```
npm create vite@latest <project_name> react-ts
```

Then install Tailwind
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Add other Tailwind configuration

-Project Initialization
```
npm run dev
```

## More Packages
- Used React Lazy Load Image Component for better performance and optimization.
- Used axios for faster data fetching because it escapes an extra step of json parsing.

## Fetch product data from the provided API endpoint.
Used axios package to get products details from API - "https://fakestoreapi.com/products"

## Grid to display products
By using Tailwind CSS Grid to display products destails on home page.

## Product filtering by category
Used Dropdown to filter products

## pagination to Access product list.
