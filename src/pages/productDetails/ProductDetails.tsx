import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "../../services/axios";
import {Pdct} from "../../types/Products";
import CustomSpinner from "../../components/UI/Spinner";
import {BtnShop} from "../../components/UI/Buttons";
import RatingStars from "../../components/UI/RatingStar";
import SocialSvg from "../../components/UI/SocialSvg";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Pdct>();
  const [isError, setISError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/products/${id}`)
        setProduct(res.data)
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError('An unexpected error occurred');
        }
      }
    };
    fetchProductDetails()
  }, [id]);

  if (!product) return <CustomSpinner/>;

  if(isError) {return <h1 className='text-center text-2xl font-semibold text-red-700'>{isError}</h1>}

  return (
    <div key={product.id} className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-36 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap group relative overflow-hidden">
          <LazyLoadImage
            alt={product.title}
            className="lg:w-1/2 w-full lg:h-auto max-h-[500px] h-64 object-contain transition duration-500 group-hover:scale-105 sm:h-72"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 items-center">
            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
            {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {product.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <RatingStars rating={product.rating.rate} />
                <span className="text-gray-600 ml-3">{product.rating.rate}</span>
                <span className="text-gray-600 ml-3">({product.rating.count} reviews)</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <SocialSvg />
              </span>
            </div>
            <p className="leading-relaxed">
            {product.description}
            </p>
            <div className="flex justify-between mt-4 pt-4 border-t-2">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <div className="flex gap-4">
                <BtnShop data={"Buy Now"}/>
                <BtnShop data={"Add to Cart"} />
              </div>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
