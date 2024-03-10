import React, { useEffect, useState } from "react";
import "./style.css";
import Axios from "axios";
import { SearchIcon } from "../../../component/icon-svg";

const ContactsList = () => {
  const [contact, setContact] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:1337/passenger`)
      .then((response) => {
        setContact(response.data.items);
      })
      .catch((error) => console.error(error, "00000000000"));
  }, []);

  const Search = () => {
    let contactData = contact;

    return function inner() {
      if (search.length > 0) {
        console.log(contact.filter((v) => v.includes(search)));
      } else {
        setContact(contactData);
      }
    };
  };
  const SearchBox = Search();
  return (
    <section className="contacts-list container mx-auto px-4">
      <h1>Contacts</h1>

      <div className="last-search position-sticky   top-5">
        <form className="max-w-md mx-auto">
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
              placeholder="Search Mockups, Logos..."
              onChange={SearchBox}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="search"></div>
      {!!contact &&
        contact?.map((v, i) => {
          return (
            <div className="contacts" key={i}>
              <div className="box flex flex-row">
                <div className="avatar">
                  <img
                    src={v.avatar}
                    alt="avatar"
                    className="rounded-full"
                    width="100"
                    height="100"
                  />
                </div>
                <div className="flex flex-col justify-center pr-5">
                  <div className="name">
                    <span>{v.first_name}</span>
                  </div>
                  <div className="phone-number">
                    <span>{v.phone}</span>
                  </div>
                </div>

                <div className="city flex flex-col justify-center">
                  <span>{v.address}</span>
                </div>
              </div>
            </div>
          );
        })}

      <div></div>
    </section>
  );
};

export default ContactsList;
