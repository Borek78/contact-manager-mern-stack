import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ErrorPage from "./ErrorPage";
import ContactDetail from "./ContactDetail";
import DeletePage from "./DeletePage";
import EditContact from "./EditContact";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app.css";
import "../app-responsive.css";
import { v4 as uuidv4 } from "uuid";
import { api } from "../help/axiosApi";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [update, setUpdate] = useState(0);

  //RETRIEVING DATA
  useEffect(() => {
    const retrieveContacts = async function () {
      const response = await api.get("/");
      setContacts(response.data);
    };
    retrieveContacts();
  }, [update]);

  //DELETE
  async function deleteContactHandler(id) {
    await api.delete(`/delete/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
    setUpdate(update + 1);
  }

  //ADD
  const addContactHandler = async function (contact) {
    const newContact = { id: uuidv4(), ...contact };
    console.log(newContact);
    await api.post("/add", newContact);

    setContacts([...contacts, newContact]);
    setUpdate(update + 1);
  };

  //UPDATE
  const updateContactHandler = async function (updatedContact) {
    const { id, name, email, _id } = updatedContact;
    console.log(id);
    await api.put(`/edit/${_id}`, updatedContact);

    const newContacts = contacts.map((contact) => {
      return contact.id === id ? updatedContact : contact;
    });

    setContacts(newContacts);
    setUpdate(update + 1);
  };

  //SEARCH
  function searchHandler(a) {
    console.log("Search Term is: " + a);
    setSearchTerm(a);
    if (a !== "") {
      const newContactList = contacts.filter((contact) => {
        return [contact.name + contact.email]
          .join()
          .toLowerCase()
          .includes(a.toLowerCase());
      });
      console.log(newContactList);
      setSearchResults(newContactList);
      console.log(searchResults);
    } else {
      setSearchResults(contacts);
    }
  }

  //return
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                searchHandler={searchHandler}
              />
            }
          />

          <Route path="/contact/:_id" element={<ContactDetail />} />
          <Route
            path="/delete/:_id"
            element={<DeletePage deleteContactHandler={deleteContactHandler} />}
          />

          <Route
            path="/edit/:_id"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <footer></footer>
      </Router>
    </>
  );
}

export default App;
