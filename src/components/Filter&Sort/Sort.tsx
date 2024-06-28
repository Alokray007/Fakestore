import React from "react";
import { SortProps } from "../../types/Products";

const Sort: React.FC<SortProps> = ({ handleSortChange }) => {
  return (
    <div>
      <label
        htmlFor="SortBy"
        className="block text-xs font-medium text-gray-700"
      >
        {" "}
        Sort By{" "}
      </label>

      <select
        id="SortBy"
        className="mt-1 rounded border-gray-300 text-sm"
        onChange={handleSortChange}
      >
        <option value="">Sort By</option>
        <option value="Title, DESC">Title, DESC</option>
        <option value="Title, ASC">Title, ASC</option>
        <option value="Popularity">Popularity</option>
        <option value="Price, HL">Price: High to Low</option>
        <option value="Price, LH">Price: Low to High</option>
        <option value="Rating, HL">Rating: High to Low</option>
        <option value="Rating, LH">Rating: Low to High</option>
      </select>
    </div>
  );
};

export default Sort;
