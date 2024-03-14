require("./DB/config.js");
const express = require("express");
const app = express();
const cors = require("cors");
const crudSchema = require("../server/models/crud.js");
const crud = require("../server/models/crud.js");
const PORT = process.env.PORT || 7070;

app.use(cors());
app.use(express.json());

app.get("/", async (req, resp) => {
  const data = await crud.find({});
  resp.send(data);
});

app.post("/create", async (req, resp) => {
  const paylode = req.body;
  console.log(paylode);
  const data = await crudSchema(paylode);
  const result = await data.save();
  resp.send(result);
});

app.put("/update/:id", async (req, resp) => {
  console.log(req.params.id);
  const data = await crudSchema.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(data);
});

app.delete("/delete/:_id", async (req, resp) => {
  const data = await crud.deleteOne({ _id: req.params._id });
  resp.send(data);
});

app.listen(PORT, () => {
  console.log(`This App is running on the port number ${PORT}`);
});
