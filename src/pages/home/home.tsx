import { useEffect, useState } from 'react';
import CategoryFilter from '../../components/CategoryFilter';
// import HeroHome from '../../components/hero/HeroHome';
import ProductList from '../../components/ProductList';
import axios from "../../services/axios";
import {Pdct} from '../../types/Products';
import Testimonial from '../../components/testimonial/Testimonial';
import Categories from '../../components/categories/Categories'
import Hero from '../../components/hero/Hero';

const Home = () => {
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
    <Hero />
    <CategoryFilter onCategoryChange={handleCategoryChange}/>
    <h1 className='text-center text-3xl m-2 p-4 font-semibold text-yellow-400'>PRODUCTS</h1>
    {isError && <h1 className='text-center text-2xl font-semibold text-red-700'>{isError}</h1>}
    <ProductList products={filteredProducts}/>
    <Testimonial />
  </div>
  );

};

export default Home;
