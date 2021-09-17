const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config("./env");

const password = process.env.DB_PASSWORD;
console.log(password);

const url = `mongodb+srv://geetAdmin:${password}@tuludictionary.ks25c.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  // defines the shape of the documents within that collection.
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
