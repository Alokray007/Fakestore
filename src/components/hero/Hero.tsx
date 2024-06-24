import React, {useState, useEffect} from "react";
import axios from "../../services/axios";
import Pdct from '../../types/Products';

const Hero: React.FC = () => {
  const [products, setProducts] = React.useState<Pdct[]>([]);
  const [isError, setISError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError("An unexpected error occurred");
        }
      }
    };
    getProducts()
  }, []);


  return (
    <section className="Hero relative h-screen w-screen bg-[#4C56D7] bg-opacity-5 overflow-hidden">
      <div className="flex h-[10%] justify-end bg-white pr-2">
        <label className="my-auto text-2xl sm:text-4xl">
          SHOP THE LATEST DROP
        </label>
      </div>

      <div className="h-[90%]">
        <div className="ContentArea relative h-full">
          <div className="h-full">
          {isError && <h1 className='text-center text-2xl font-semibold text-red-700'>{isError}</h1>}
          {products.map(product => (
            <div key={product.id} className="flex h-full w-full items-end justify-end">
              <img
                src={product.image}
                className="absolute top-0 h-[90%] w-screen object-cover object-top sm:h-full sm:w-screen-1/2"
              />
            </div>
             ))};
            <div className="absolute bottom-0 flex">
              <div>
                <div className="ProductInfo w-[200px] rounded bg-white p-4 sm:ml-10 sm:w-[280px] sm:bg-opacity-10 md:w-[520px]">
                  <h4 className="text-xl sm:text-3xl md:text-6xl">
                    New Arrival
                  </h4>
                  <h5 className="mt-2 text-base sm:text-xl md:text-2xl">
                    Get it Fast
                  </h5>
                  <div className="mt-2 h-[24px] sm:h-[50px] md:h-[80px]"></div>
                  <button className="mt-2 bg-[#4C56D7] px-10 py-2 text-white sm:px-14">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-0 z-10 flex sm:bottom-0 sm:right-4">
            <div className="mr-1 flex h-[50px] w-[50px] items-center justify-center border bg-white sm:m-2 sm:h-[80px] sm:w-[80px]">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </a>
            </div>
            <div className="mr-1 flex h-[50px] w-[50px] items-center justify-center border bg-white sm:m-2 sm:h-[80px] sm:w-[80px]">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
