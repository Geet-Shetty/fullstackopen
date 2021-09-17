const mongoose = require("mongoose");

// const dotenv = require("dotenv");
// dotenv.config("./env");

const password = process.argv[2];
console.log(password);

const url = `mongodb+srv://geetAdmin:${password}@tuludictionary.ks25c.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  // defines the shape of the documents within that collection.
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema); // fancy constructor

if (process.argv.length === 2) {
  const person = new Person({
    // instance of a model : document
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
