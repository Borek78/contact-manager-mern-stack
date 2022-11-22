import user from "../images/gautam-verma.png";

import { useLocation, Link } from "react-router-dom";

function ContactDetail() {
  const location = useLocation();

  const { contact } = location.state;

  console.log(contact);

  return (
    <div className="">
      <div className="center">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="">{contact.name}</div>
          <div className="describtion">{contact.email}</div>
        </div>
        <Link to="/">
          <button className="btn btn-primary fifty">
            Go Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
