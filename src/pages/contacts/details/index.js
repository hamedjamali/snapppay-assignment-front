import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ContactDetails = () => {
  const { id } = useParams();
  const [contactDetail, setContactDetail] = useState(null);
  let dispatch = useDispatch();
  const ids = useSelector((state) => state.ids);

  const storeToLocal = () => {
    const repeated = ids?.some((v) => v == id);
    console.log('length', ids, ids?.length);
    if (!repeated && ids?.length < 4) {
      dispatch({
        type: "user",
        ids: !!ids ? [...ids, id] : [id],
      });
    } else if(!repeated){
      ids.splice(0, 1);
      dispatch({
        type: "user",
        ids: [...ids, id],
      });
    }
  };
  useEffect(() => {
    storeToLocal();
    console.log(id, "id", ids);
    axios
      .get(`http://localhost:1337/passenger/${id}`)
      .then((response) => setContactDetail(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section>
      {contactDetail ? (
        <div className="profile flex flex-col items-center  contacts p-2  border-2 border-light-blue-500 border-opacity-100 m-2 border-ra rounded-lg flex-wrap">
          <div className="avatar flex px-5 ">
            {!!contactDetail.avatar ? (
              <img
                src={contactDetail.avatar}
                alt="avatar"
                className="rounded-full"
                width="100"
                height="100"
              />
            ) : (
              <div className="rounded-full w-24 h-24"></div>
            )}
          </div>

          <div className="sectionOne w-full flex justify-center flex-wrap">
            <span className="w-1/4 flex ">
              Name : {contactDetail.first_name ?? "___"}{" "}
              {contactDetail.last_name ?? "___"}
            </span>
            <span className="w-1/4 flex ">
              gender : {contactDetail.gender ?? "______"}
            </span>
          </div>
          <div className="sectionTwo w-full flex justify-center">
            <span className="w-1/4 flex ">phone : {contactDetail.phone}</span>
            <span className="w-1/4 flex ">
              address : {contactDetail.address ?? "______"}
            </span>
          </div>
          <div className="sectionThree w-full flex justify-center">
            <span className="w-1/4 flex ">
              email : {contactDetail.email ?? "______"}
            </span>
            <span className="w-1/4 flex ">
              company : {contactDetail.company ?? "______"}
            </span>
          </div>
          <div className="sectionFour w-full flex justify-center">
            <span className="w-2/4">
              note : {contactDetail.note ?? "______"}
            </span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default ContactDetails;
