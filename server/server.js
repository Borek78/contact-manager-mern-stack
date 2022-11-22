const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const cors = require("cors");
const app = express();

//connect to db
mongoose
  .connect("mongodb://localhost:27017/contacts")
  .then((result) => {
    console.log("Connected to db at PORT 4000");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

//setup
app.use(cors());
app.use(express.json());

//delete - delete data
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  Contact.findByIdAndDelete(id).then((result) => {
    console.log("deleted");
    res.send("ahoj");
  });
});

//post - add data
app.post("/add", (req, res) => {
  console.log("jsem v post");
  console.log(req.body);

  const x = req.body.name;

  const contact = new Contact({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  });

  contact.save();

  console.log(contact);
});

//get - retrieve data
app.get("/", (req, res) => {
  console.log("jsem v /");

  Contact.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//blog routes
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
