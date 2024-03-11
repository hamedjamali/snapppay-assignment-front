import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ContactDetails = () => {
  const { id } = useParams();
  const [contactDetail, setContactDetail] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/passenger/${id}`)
      .then((response) => setContactDetail(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section>
      {contactDetail ? (
        <>
          {contactDetail.map((v, i) => {
            return (
              <div>
                <div className="profile"></div>
                <div className="sectionOne"></div>
                <div className="sectionTwo"></div>
                <div className="sectionThree"></div>
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default ContactDetails;
