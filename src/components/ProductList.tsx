import { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import StarSvg from '../assets/svg/star-7207.svg';

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


const ProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
      {products.map(product => (
        <div key={product.id} className="border p-4">
          <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <div className="flex justify-between">
            <p>Price: ${product.price}</p>
            <div className="flex gap-2">
              <div className="flex">
                <span>{product.rating.rate}</span>
                <img className=" h-4 w-4 self-center" src={StarSvg} alt="rating-star" />
              </div>
              <span>({product.rating.count})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
