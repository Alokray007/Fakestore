import React, { useState, useEffect } from 'react';

interface CategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  return (
    <div className='text-end mr-10'>
        <select className="border-2 border-black hover:border-red-600 hover:cursor-pointer" onChange={e => onCategoryChange(e.target.value)}>
            <option value="">All</option>
            {categories.map(category => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    </div>
  );


};

export default CategoryFilter;
