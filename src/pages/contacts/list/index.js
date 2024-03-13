import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import SearchComponent from "../../../component/search";
import { useSelector } from "react-redux";

const ContactsList = () => {
  const [contact, setContact] = useState(null);
  const latestValue = useRef(contact);
  const contactList = useDeferredValue(contact);
  const ids = useSelector((state) => state.ids);
  const abortControllerRef = useRef(null);
  useEffect(() => {
    Axios.get(`http://localhost:1337/passenger`)
      .then((response) => {
        setContact(response.data.items);
        latestValue.current = response.data.items;
      })
      .catch((error) => console.error(error));

    return () => {
      clearTimeout();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const dataFromServer = ({ val, sort }) => {
    if (val.length > 0) {
      if (abortControllerRef.current) {
        console.log(abortControllerRef.current, "abortControllerRef.current");
        abortControllerRef.current.abort();
      }
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;
      setTimeout(() => {
        let param = JSON.stringify({
          [sort]: { contains: val.toLowerCase() },
        });
        Axios.get(
          `http://localhost:1337/passenger/?where=${param}&sort=createdAt DESC&limit=30`,
          { signal: newAbortController.signal }
        )
          .then((response) => {
            setContact(response.data.items);
          })
          .catch((error) => console.error(error));
      }, 500);
    } else {
      setContact(latestValue.current);
    }
  };

  return (
    <section className="contacts-list container mx-auto px-4">
      <h1>Contacts</h1>

      <SearchComponent
        data={latestValue?.current}
        dataFromServer={(val) => dataFromServer(val)}
        searchList={(val) => setContact(val)}
      />

      <div className="search flex row">
        {!!latestValue.current &&
          latestValue.current
            .filter((v) => ids.some((id) => v.id == id))
            .map((v, i) => {
              return (
                <Link to={`/contact/${v.id}`} key={i}>
                  <div className="contacts p-2  border-2 border-light-blue-500 border-opacity-100 m-2 border-ra rounded-lg">
                    <div className="box flex flex-row">
                      <div className="avatar">
                        {!!v.avatar ? (
                          <img
                            src={v.avatar}
                            alt="avatar"
                            className="rounded-full"
                            width="50"
                            height="50"
                          />
                        ) : (
                          <div className="rounded-full w-24 h-24"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
      {!!contactList &&
        contactList?.map((v, i) => {
          return (
            <Link to={`/contact/${v.id}`} key={i}>
              <div className="contacts p-2  border-2 border-light-blue-500 border-opacity-100 m-2 border-ra rounded-lg">
                <div className="box flex flex-row">
                  <div className="avatar">
                    {!!v.avatar ? (
                      <img
                        src={v.avatar}
                        alt="avatar"
                        className="rounded-full"
                        width="100"
                        height="100"
                      />
                    ) : (
                      <div className="rounded-full w-24 h-24"></div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center pr-5">
                    <div className="name">
                      <span>
                        {v.first_name} {v.last_name}
                      </span>
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
            </Link>
          );
        })}

      <div></div>
    </section>
  );
};

export default ContactsList;
