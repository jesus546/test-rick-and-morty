import React from "react";
import Filter from "../filter";


interface InSearch {
  searchCharacter: string;
  setSearchCharacter: (value: string) => void;
}
const Search: React.FC<InSearch> = ({
  searchCharacter,
  setSearchCharacter,
}) => {
  return (
    <div className="bg-[#F3F4F6] py-2.5 px-5 flex items-center gap-3 rounded-lg">
      <img
        className="inline-block h-4 w-4 "
        src="/icons/search.svg"
        alt="search"
      ></img>
      <input
        value={searchCharacter}
        onChange={(e) => setSearchCharacter(e.target.value)}
        className="bg-transparent outline-none w-full "
        placeholder="Search or filter results"
        type="text"
      />
      <Filter/>
    
    </div>
  );
};

export default Search;
