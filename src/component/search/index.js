import React, {
  memo,
  useDeferredValue,
  useState,
} from "react";
import { SearchIcon } from "../icon-svg";

const Search = memo(({ data, searchList, dataFromServer }) => {
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search);

  const SearchFilter = (v) => {
    let input = v?.target?.value ?? "";
    setSearch(input);
    dataFromServer(input)
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
            placeholder="Search Name, Phone..."
            onChange={SearchFilter}
            value={search}
            required
          />
        </div>
      </form>
    </div>
  );
});

export default Search;
