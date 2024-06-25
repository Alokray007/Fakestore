import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ProductDetails from './pages/productDetails/ProductDetails';
import {Routes, Route } from 'react-router-dom'
import ContactUs  from './pages/contact/ContactUs';

const App = () => {

  return (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
    <Footer />
  </div>
  );
};

export default App;
