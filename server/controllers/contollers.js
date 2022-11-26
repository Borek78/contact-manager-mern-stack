const Contact = require("../models/contact");

// retrieve
const contact_retrieve = (req, res) => {
  console.log("jsem v /");

  Contact.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete
const contact_delete = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Contact.findByIdAndDelete(id).then((result) => {
    console.log("deleted");
    res.send();
  });
};

//add
const contact_add = (req, res) => {
  const contact = new Contact({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  });

  contact.save();
  res.json();
};

//update
const contact_update = (req, res) => {
  const id = req.params.id;

  const updatedContact = {
    _id: req.body._id,
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  };

  Contact.findByIdAndUpdate(id, updatedContact)
    .then((result) => {
      console.log("updated");
      res.send();
    })
    .catch((err) => {
      console.log(err);
    });

  res.json();
};

module.exports = {
  contact_delete,
  contact_add,
  contact_retrieve,
  contact_update,
};
