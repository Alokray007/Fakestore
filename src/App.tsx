import { useEffect, useState } from 'react';
import { fetchProducts } from "./services/api";
import ProductList from './components/ProductList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CategoryFilter from './components/CategoryFilter';


interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

const App = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
      setFilteredProducts(products);
    };
    getProducts();
  }, []);

  const handleCategoryChange = (category:string) => {
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
  <div className="App">
    <Header />
    <h1 className='text-center text-3xl m-5 p-8 font-semibold text-yellow-400'>PRODUCTS</h1>
    <CategoryFilter onCategoryChange={handleCategoryChange}/>
    <ProductList products={filteredProducts}/>
    <Footer />
  </div>
  );
};

export default App;
