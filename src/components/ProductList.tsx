import React, { useState } from "react";
import StarSvg from "../assets/svg/star-7207.svg";
import CustomSpinner from "./UI/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Pdct from "../types/Products";
import { Link } from "react-router-dom";

// Define the props interface for the ProductList component
interface ProductListProps {
  products: Pdct[];
}

const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 800,
      left: 0,
      behavior: "smooth",
    });
  };

  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!products.length) return <CustomSpinner />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10 ">
        {currentItems.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="border p-4 cursor-pointer">
            <LazyLoadImage
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-contain"
            />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <div className="flex justify-between">
              <p>Price: ${product.price}</p>
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
          </Link>
        ))}
      </div>
      <div className="my-4 text-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleChangePage(index + 1)}
            className="px-3 py-1 border mx-2 focus:bg-green-400"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductList;
