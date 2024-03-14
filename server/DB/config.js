require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connect succesfully");
  })
  .catch((error) => {
    console.log(error);
  });
