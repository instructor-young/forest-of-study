import { useState } from "react";
import { useSearchParams } from "react-router";
import SearchIcon from "../assets/img/icon_search.png";

function Search() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    searchParams.set("query", query);
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="h-[42px] rounded-[15px] px-5 flex items-center border border-gray-dddddd w-[335px]">
      <img src={SearchIcon} className="size-[18px] mr-2.5" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="검색"
        className="placeholder:text-gray-818181 w-full outline-none"
      />
    </form>
  );
}

export default Search;
