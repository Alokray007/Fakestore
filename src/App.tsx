import { useEffect, useState } from 'react';
import axios from "./services/axios";
import ProductList from './components/ProductList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CategoryFilter from './components/CategoryFilter';
import Pdct from './types/Products';

const App = () => {
  const [products, setProducts] = useState<Pdct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Pdct[]>([]);
  const [isError, setISError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError('An unexpected error occurred');
        }
      }
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
    <CategoryFilter onCategoryChange={handleCategoryChange}/>
    <h1 className='text-center text-3xl m-2 p-4 font-semibold text-yellow-400'>PRODUCTS</h1>
    {isError && <h1 className='text-center text-2xl font-semibold text-red-700'>{isError}</h1>}
    <ProductList products={filteredProducts}/>
    <Footer />
  </div>
  );
};

export default App;
