import React from 'react';
import StarSvg from '../assets/svg/star-7207.svg'
import CustomSpinner from './UI/Spinner';
import  {LazyLoadImage}  from "react-lazy-load-image-component";
import Pdct from '../types/Products';

// Define the props interface for the ProductList component
interface ProductListProps {
  products: Pdct[];
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
  if (!products.length) return <CustomSpinner/>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10 ">
      {products.map(product => (
        <div key={product.id} className="border p-4">
          <LazyLoadImage src={product.image} alt={product.title} className="w-full h-64 object-contain" />
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
