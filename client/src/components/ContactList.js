import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

function ContactList(props) {
  console.log(props.contacts);
  const renderContactList = props.contacts.map((contact) => {
    return <ContactCard key={contact.id} contact={contact} />;
  });

  console.log(props);

  return (
    <>
      <h4 className="contact-list-heading">
        Contact List
        <Link to="/add">
          <button className="btn btn-primary right">Add Contact</button>
        </Link>
      </h4>
      <div className="div-search-filter">
        <input
          type="text"
          className="input-search-filter"
          placeholder="Search Contacts"
          onChange={(e) => {
            props.searchHandler(e.target.value);
          }}
        />
      </div>

      <div className="contactlist">
        {renderContactList.length > 0
          ? renderContactList
          : "No results available"}
      </div>
      <div className="footer"></div>
    </>
  );
}

export default ContactList;
