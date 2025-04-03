import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ToggleIcon from "../assets/img/icon_toggle.png";

const sortingOptions = [
  { label: "최근 순", value: "createdAt,desc" },
  { label: "오래된 순", value: "createdAt,asc" },
  { label: "많은 포인트 순", value: "point,desc" },
  { label: "적은 포인트 순", value: "point,desc" },
];

function Sorting() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortingOption = sortingOptions.find((sortingOption) => sortingOption.value === searchParams.get("orderBy")) || sortingOptions[0];
  const [selectedSortingOption, setSelectedSortingOption] = useState(initialSortingOption);

  const handleClickSortingOption = (sortingOption) => () => {
    setSelectedSortingOption(sortingOption);
    setIsOpen(false);
  };

  useEffect(() => {
    searchParams.set("orderBy", selectedSortingOption.value);
    setSearchParams(searchParams);
  }, [searchParams, selectedSortingOption, setSearchParams]);

  return (
    <div className="w-[180px] relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-[42px] px-5 border border-gray-dddddd rounded-[15px] text-gray-818181 leading-none w-full flex items-center justify-between bg-white transition hover:brightness-95 active:brightness-90"
      >
        <span>{selectedSortingOption.label}</span>
        <img src={ToggleIcon} className="size-6" />
      </button>

      <ul
        data-is-open={isOpen}
        className="hidden data-[is-open=true]:block absolute -bottom-2 translate-y-full z-10 w-full border rounded-[15px] border-gray-dddddd bg-white"
      >
        {sortingOptions.map((sortingOption) => (
          <li key={sortingOption.value} className="group/li">
            <button
              className={
                "h-[42px] text-black-414141 leading-none group-last-of-type/li:rounded-b-[15px] group-first-of-type/li:rounded-t-[15px] group-last-of-type/li:border-none border-b border-gray-dddddd w-full transition hover:brightness-95 bg-white active:brightness-90"
              }
              onClick={handleClickSortingOption(sortingOption)}
            >
              {sortingOption.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sorting;
