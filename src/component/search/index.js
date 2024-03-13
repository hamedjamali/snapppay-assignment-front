import React, { memo, useDeferredValue, useState } from "react";
import { SearchIcon } from "../icon-svg";
function createIncrement() {
  let searchVal = "";
  let sortVal = "last_name";

  function SearchVal(v) {
    if (!!v) {
      searchVal = v;
    }

    return searchVal;
  }
  function Sort(v) {
    if (!!v) {
      sortVal = v;
    }

    return sortVal;
  }

  return [SearchVal, Sort];
}
const [SearchVal, Sort] = createIncrement();
const Search = memo(({ data, searchList, dataFromServer }) => {
  const [search, setSearch] = useState("");

  const SearchFilter = (v) => {
    let input = v?.target?.value ?? "";
    setSearch(input);
    SearchVal(input);
    dataFromServer({ val: input, sort: Sort(null) });

    // static handle
    // if (input?.length > 0) {
    //   let name = data?.filter((v) => v.first_name.toLowerCase().includes(input)) ?? [];
    //   let phone = data?.filter((v) => v.phone.includes(input)) ?? [];
    //   let city = data?.filter((v) => v.address?.toLowerCase().includes(input)) ?? [];
    //   searchList([...name, ...phone, ...city]);
    // } else {
    //   searchList(data);
    // }
  };

  const changeSort = (e) => {
    Sort(e.target.value);
    dataFromServer({ val: SearchVal(null), sort: e.target.value });
  };
  return (
    <div className="last-search sticky top-5">
      <form className="p-2 mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search name, phone..."
            onChange={SearchFilter}
            value={search}
            required
          />
        </div>
        <label htmlFor="cars">Sort By :</label>
        <select
          name="cars"
          id="cars"
          className="outline-none"
          onChange={changeSort}
        >
          <option value="first_name">Name</option>
          <option value="last_name">FamilyName</option>
          <option value="Phone">phone</option>
        </select>
      </form>
    </div>
  );
});

export default Search;
