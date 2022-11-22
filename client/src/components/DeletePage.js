import { Link, useLocation, useNavigate } from "react-router-dom";

import person from "../images/person-circle.svg";

function Deletepage(props) {
  const location = useLocation();

  const { contact } = location.state;

  const navigate = useNavigate();

  async function deleteContact() {
    console.log("delete pred");

    await props.deleteContactHandler(contact._id);
    console.log("delete po");
    navigate("/");
  }

  return (
    <>
      <h4 className="contact-list-heading">
        Delete Page
        <Link to="/">
          <button className="btn btn-primary right">
            Back to Contact List
          </button>
        </Link>
      </h4>
      <div className="contactlist delete-page">
        Are you sure that you want to delete this contact?
      </div>

      <div className="delete-contact">
        <img src={person} alt="" className="person" />
        <div className="name-and-email">
          <div className="name-in-contact-card">{contact.name}</div>
          <div>{contact.email}</div>
        </div>
        <button className="btn btn-primary down" onClick={deleteContact}>
          Yes, let´s delete it.
        </button>
      </div>
    </>
  );
}

export default Deletepage;
