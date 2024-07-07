import { lazy } from 'react';
const Home = lazy(() => import('./pages/home/home'));
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ProductDetails from './pages/productDetails/ProductDetails';
import {Routes, Route } from 'react-router-dom';
const ContactUs = lazy(() => import('./pages/contact/ContactUs'));
const Products = lazy(() => import('./pages/products/Products'));
import ErrorPage from './pages/error/ErrorPage';
import Cart from './pages/cart/Cart';

const App = () => {
  return (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
    <Footer />
  </div>
  );
};

export default App;
