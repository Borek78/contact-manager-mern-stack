import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditContact(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state;
  const { id, name, email, _id } = contact;
  const [updatedContact, updateContact] = useState({
    _id: _id,
    id: id,
    name: name,
    email: email,
  });

  console.log(contact);

  async function update(e) {
    e.preventDefault();

    if (contact.name === "" || contact.email === "") {
      alert("All the fields are MANDATORY");
    }

    console.log(updatedContact);
    await props.updateContactHandler(updatedContact);

    navigate("/");
  }

  return (
    <div className="addcontact">
      <h4>Edit Contact</h4>
      <br />
      <form onSubmit={update}>
        <div className="name-and-email">
          <div className="name-in-contact-card">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              value={updatedContact.name}
              className="input"
              placeholder="Name"
              type="text"
              onChange={(e) => {
                updateContact({
                  _id: _id,
                  id: id,
                  name: e.target.value,
                  email: updatedContact.email,
                });
              }}
            />
          </div>

          <div className="name-in-contact-card">
            <label className="label" htmlFor="">
              Email
            </label>
            <input
              value={updatedContact.email}
              className="input"
              placeholder="Email"
              type="text"
              onChange={(e) => {
                updateContact({
                  _id: _id,
                  id: id,
                  name: updatedContact.name,
                  email: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <br />

        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditContact;
