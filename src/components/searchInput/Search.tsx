import React from "react";
import {setSearchProps} from "../../types/Products"

const Search:React.FC<setSearchProps> = ({setSearch}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="mt-1 rounded border-gray-300 text-l"
        placeholder="Search Products"
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
