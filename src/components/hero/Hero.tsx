import React, { useState, useEffect, useRef } from "react";
import axios from "../../services/axios";
import { Pdct } from '../../types/Products';
import { BtnShop } from '../UI/Buttons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomSpinner from "../../components/UI/Spinner";

const Hero: React.FC = () => {
  const [products, setProducts] = useState<Pdct[]>([]);
  const [product, setProduct] = useState<Pdct | null>(null);
  const [isError, setISError] = useState<string | null>(null);
  const productsRef = useRef<Pdct[]>([]);

  const getRandomProduct = (products: Pdct[]) => {
    if (products.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products');
        const products = res.data;
        setProducts(products);
        productsRef.current = products; // Update the ref
        setProduct(getRandomProduct(products)); // Set the initial product immediately
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError("An unexpected error occurred");
        }
      }
    };
    fetchProducts();

    const intervalId = setInterval(() => {
      setProduct(getRandomProduct(productsRef.current));
    }, 30000); // Refresh every 30 Seconds

    return () => clearInterval(intervalId);
  }, []);

  if (!product) return <CustomSpinner />;

  if (isError) {
    return <h1 className='text-center text-2xl font-semibold text-red-700'>{isError}</h1>;
  }

  return (
    <section className="text-gray-600 body-font m-8">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-red-500">
            Before they sold out
          </h1>
          <p className="mb-8 text-xl leading-relaxed">{product.title}</p>
          <div className="flex justify-center gap-4">
            <BtnShop data="Add To Cart" />
            <BtnShop data="Buy Now" />
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <LazyLoadImage className="object-contain object-center rounded h-96" alt={product.title} src={product.image} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
