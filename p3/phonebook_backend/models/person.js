const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const dotenv = require("dotenv");
dotenv.config("./env");

const password = process.env.DB_PASSWORD;
console.log(password);

const url = process.env.DB_URL;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  // defines the shape of the documents within that collection.
  name: { type: String, unique: true, required: true },
  number: { type: String, unique: true, required: true },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
