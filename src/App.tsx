import Home from './pages/home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductDetails from './pages/productDetails/ProductDetails';
import {Routes, Route } from 'react-router-dom'

const App = () => {

  return (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
    <Footer />
  </div>
  );
};

export default App;
