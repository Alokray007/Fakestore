import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import { CategoryFilterProps } from "../../types/Products";

const Category: React.FC<CategoryFilterProps> = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [isError, setISError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/products/categories");
        setCategories(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError("An unexpected error occurred");
        }
      }
    };
    getCategories();
  }, []);

  if (isError) {
    return (
      <h1 className="text-center text-2xl font-semibold text-red-700">
        {isError}
      </h1>
    );
  }
  if (categories.length === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold text-red-700">
        Loading...
      </h1>
    );
  }

  return (
    <>
      <h2 className="block text-xs font-medium text-gray-700">Category</h2>
      <ul className="mt-1 rounded border-gray-300 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          <div>
            <li
              className="cursor-pointer mt-2 hover:underline hover:text-blue-500 focus:text-blue-500"
              onClick={() => onCategoryClick("All")}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className="cursor-pointer mt-2 hover:underline hover:text-blue-500 focus:text-blue-500"
                onClick={() => onCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </div>
        </div>
      </ul>
    </>
  );
};

export default Category;
