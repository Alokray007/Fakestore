import React from "react";
import {handleSearchProps} from "../../types/Products"

const Search:React.FC<handleSearchProps> = ({handleSearch}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="mt-1 rounded border-gray-300 text-l"
        placeholder="Search Products"
        onChange={(e) => handleSearch(e)}
      />
    </form>
  );
};

export default Search;
