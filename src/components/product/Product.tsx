import React from "react";
import { ProductSearchListProps } from "../../types/Products";
import StarSvg from "../../assets/svg/star-7207.svg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Spinner from "../UI/Spinner";

const Product: React.FC<ProductSearchListProps> = ({ products, search, sortedProducts }) => {
  let find:string;
  if (typeof(search) === 'string') {
    find = search.toLowerCase()
  }

  if (products.length === 0) return <Spinner />;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedProducts.filter((item) => {return find === '' ? item : (item.title.toLowerCase().includes(find) || item.description.toLowerCase().includes(find))}).map((product) => (
        <li key={product.id} className="flex h-full">
          <Link
            to={`/products/${product.id}`}
            className="group relative block overflow-hidden border flex-grow"
          >
            <LazyLoadImage
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72"
            />
            <div className="relative border border-gray-100 bg-white px-6 pb-6">
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {product.title}
              </h3>
              <div className="flex justify-between items-center mt-1.5 text-sm text-gray-700">
                <p>
                  Price: <span className="font-semibold">${product.price}</span>
                </p>
                <div className="flex gap-2">
                  <div className="flex">
                    <span>{product.rating.rate}</span>
                    <img
                      className=" h-4 w-4 self-center"
                      src={StarSvg}
                      alt="rating-star"
                    />
                  </div>
                  <span>({product.rating.count})</span>
                </div>
              </div>
              <form className="mt-4">
                <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                  Add to Cart
                </button>
              </form>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Product;
