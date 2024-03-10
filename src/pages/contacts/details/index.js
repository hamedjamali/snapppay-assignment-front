import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get(`/${id}`)
      .then(response => setContact(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      {contact ? (
        <div>
          <h1>{contact.name}</h1>
          {/* Display more details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ContactDetails;