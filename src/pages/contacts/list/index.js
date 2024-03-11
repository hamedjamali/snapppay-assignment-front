import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import Axios from "axios";

import SearchComponent from "../../../component/search";

const ContactsList = () => {
  const [contact, setContact] = useState(null);
  const latestValue = useRef(contact);
  const contactList = useDeferredValue(contact);

  useEffect(() => {
    Axios.get(`http://localhost:1337/passenger`)
      .then((response) => {
        setContact(response.data.items);
        latestValue.current = response.data.items
      })
      .catch((error) => console.error(error));
  }, []);

  const dataFromServer = (val) => {
    console.log(val, 'query');
    setTimeout(()=>{
      let x = JSON.stringify({"first_name":{"contains": val.toLowerCase()},"last_name":{"contains": val.toLowerCase()},"phone":{"contains": val}}) 
      Axios.get(`http://localhost:1337/passenger/?where=${x}&sort=createdAt DESC&limit=30`)
      .then((response) => {
        setContact(response.data.items);
      })
      .catch((error) => console.error(error));
    }, 1000)

  }
 
  return (
    <section className="contacts-list container mx-auto px-4">
      <h1>Contacts</h1>

      <SearchComponent data={latestValue?.current} dataFromServer={(val)=> dataFromServer(val)} searchList={(val)=> setContact(val)} />

      <div className="search"></div>
      {!!contactList &&
        contactList?.map((v, i) => {
          return (
            <div className="contacts p-2  border-2 border-light-blue-500 border-opacity-100 m-2 border-ra rounded-lg" key={i}>
              <div className="box flex flex-row">
                <div className="avatar">
                 { !!v.avatar ?
                  <img
                    src={v.avatar}
                    alt="avatar"
                    className="rounded-full"
                    width="100"
                    height="100"
                  />
                :
                <div className="rounded-full w-24 h-24"></div>
                }
                </div>
                <div className="flex flex-col justify-center pr-5">
                  <div className="name">
                    <span>{v.first_name} {v.last_name}</span> 
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
