import { useEffect, useState } from 'react';
import { fetchProducts } from "./services/api";
import ProductList from './components/ProductList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



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

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
  <div className="App">
    <Header />
    <h1 className='text-center text-3xl m-5 p-8'>All Product List</h1>
    <ProductList products={products}/>
    <Footer />
  </div>
  );
};

export default App;
