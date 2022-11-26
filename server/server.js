const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const controllers = require("./controllers/contollers");
const node_cron = require("node-cron");

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

//controllers
app.delete("/delete/:id", controllers.contact_delete);

app.post("/add", controllers.contact_add);

app.get("/", controllers.contact_retrieve);

app.put("/edit/:id", controllers.contact_update);

//set database to default - every day

const default_contacts = [
  {
    name: "Juicy Meat",
    email: "juicy.meat@gmail.com",
  },
  {
    name: "Hot Pepper",
    email: "hot.pepper@gmail.com",
  },
  {
    name: "Fresh Carrot",
    email: "fresh.carrot@gmail.com",
  },
  {
    name: "Green Sprout",
    email: "green.sprout@gmail.com",
  },
];

const reset_database = new CronJob("0 0 0 * * *", function () {
  //will run every day at 12:00 AM
});
