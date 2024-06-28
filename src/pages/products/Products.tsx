import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "../../services/axios";
import { Pdct } from "../../types/Products";
import Product from "../../components/product/Product";
import Category from "../../components/categories/Categories";
import Search from "../../components/searchInput/Search";
import PriceFilter from "../../components/Filter&Sort/PriceFilter";
import Sort from "../../components/Filter&Sort/Sort";
import RateFilter from "../../components/Filter&Sort/RateFilter";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Pdct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Pdct[]>([]);
  const [isError, setISError] = useState<string | null>(null);
  const [search, setSearch] = useState<string | number>("");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOption, setSortOption] = useState("Sort By");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [selectedRatings, setSelectedRatings] = useState({
    fourStar: false,
    threeStar: false,
    twoStar: false,
    oneStar: false,
  });

  // Fetch all of the products
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError("An unexpected error occurred");
        }
      }
    };
    getAllProducts();
  }, []);

  // Products Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // handle Category Change from all Products as filteredProducts
  const handleCategoryClick = (category: string) => {
    if (category === "" || category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  ////////////////////////////////////////////////////////////////

  //handle sorting from filteredProducts as sortedProducts (memoization done for sortOption, filteredProducts)
  const handleSort = useCallback(() => {
    const sortedArray = [...filteredProducts]; // Change from products to filteredProducts
    switch (sortOption) {
      case "":
        sortedArray;
        break;
      case "Title, DESC":
        sortedArray.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Title, ASC":
        sortedArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Popularity":
        sortedArray.sort(
          (a, b) =>
            b.rating.count - a.rating.count || b.rating.rate - a.rating.rate
        );
        break;
      case "Price, HL":
        sortedArray.sort((a, b) => b.price - a.price);
        break;
      case "Price, LH":
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case "Rating, HL":
        sortedArray.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "Rating, LH":
        sortedArray.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      default:
        break;
    }
    setSortedProducts(sortedArray);
  }, [sortOption, filteredProducts]);

  // calling handle sort only when change in sortOption, products
  useEffect(() => {
    handleSort();
  }, [sortOption, filteredProducts, handleSort]);

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  ////////////////////////////////////////////////////////////////

  // Handle price range change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const filteredByPrice = sortedProducts.filter((product) => {
    const price = product.price;
    const min = minPrice === "" ? -Infinity : parseFloat(minPrice as string);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice as string);
    return price >= min && price <= max;
  });

  const handleResetPrice = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  // Handle Rating Checkbox Change

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelectedRatings((prevSelected) => ({ ...prevSelected, [id]: checked }));
  };

  // Filter products based on selected ratings
  const FinalFilter = useMemo(() => {
    if (Object.values(selectedRatings).every((rating) => !rating)) {
      return filteredByPrice;
    } else {
      return filteredByPrice.filter((product) => {
        const rating = product.rating.rate;
        return (
          (selectedRatings.fourStar && rating >= 4) ||
          (selectedRatings.threeStar && rating >= 3) ||
          (selectedRatings.twoStar && rating >= 2) ||
          (selectedRatings.oneStar && rating >= 1)
        );
      });
    }
  }, [filteredByPrice, selectedRatings]);

  // Reset selected ratings
  const handleResetRating = () => {
    setSelectedRatings({
      fourStar: false,
      threeStar: false,
      twoStar: false,
      oneStar: false,
    });
  };

  if (isError) {
    return (
      <h1 className="text-center text-2xl font-semibold text-red-700">
        {isError}
      </h1>
    );
  }

  return (
    <section>
      <div className="mx-auto mt-12 max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <header>
          <h1 className="text-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Discover Our Exclusive
            <span className="sm:block">Collection</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-center">
            Explore Top-Quality Products Curated Just for You
          </p>
          <p className="text-right mt-2">
            Get Yourself the Best from Our Top{" "}
            <span className="font-bold">
              {FinalFilter.length} Products
            </span>
            .
          </p>
        </header>

        <div className="mt-8 block lg:hidden">
          <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block sticky top-20">
            <Search handleSearch={handleSearch} />
            <Category onCategoryClick={handleCategoryClick} />
            <Sort handleSortChange={handleSortChange} />

            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>

              <div className="mt-1 space-y-2">
                <PriceFilter
                  FinalFilter={FinalFilter}
                  handleResetPrice={handleResetPrice}
                  handleMinPriceChange={handleMinPriceChange}
                  handleMaxPriceChange={handleMaxPriceChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
                <RateFilter
                  selectedRatings={selectedRatings}
                  handleResetRating={handleResetRating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex-grow">
            <Product search={search} products={FinalFilter} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
