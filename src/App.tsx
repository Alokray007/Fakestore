import React, { useState, useEffect } from "react";
import { fetchProducts } from "./services/api";

const app = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
  <div className="App">
    {/* {products} */}
  </div>
  );
};

export default app;
