import { useState } from 'react';
import ProductList from './components/ProductList';
import Footer from './components/Footer/Footer';


const app = () => {

  return (
  <div className="App">
    <h1 className='text-center text-3xl m-5 p-8'>All Product List</h1>
    <ProductList />
    <Footer />
  </div>
  );
};

export default app;
