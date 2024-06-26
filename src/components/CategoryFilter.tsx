import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import {CategoriesFilterProps} from '../types/Products'


const CategoryFilter: React.FC<CategoriesFilterProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [isError, setISError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/products/categories');
        setCategories(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setISError(error.message);
        } else {
          setISError('An unexpected error occurred');
        }
      }
    };
    fetchCategories();
  }, []);

  if(isError) {return <h1 className='text-center text-2xl font-semibold text-red-700'>{isError}</h1>}
  return (
    <>
      <div className='text-end mr-10'>
        <select className="border-2 border-black hover:border-red-600 hover:cursor-pointer" onChange={e => onCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategoryFilter;
