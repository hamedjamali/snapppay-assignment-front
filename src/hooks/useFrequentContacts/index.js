import { useState, useEffect } from 'react';

const useFrequentContacts = () => {
  const [frequentContacts, setFrequentContacts] = useState([]);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('frequentContacts')) || [];
    setFrequentContacts(contacts);
  }, []);

  const addFrequentContact = (contact) => {
    const updatedContacts = [contact, ...frequentContacts.slice(0, 3)];
    localStorage.setItem('frequentContacts', JSON.stringify(updatedContacts));
    setFrequentContacts(updatedContacts);
  };

  return [frequentContacts, addFrequentContact];
};