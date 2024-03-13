import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactsList from './pages/contacts/list';
import ContactDetails from './pages/contacts/details';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<ContactsList />} />
        <Route path="/contact/:id" exact element={<ContactDetails />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
