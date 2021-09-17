const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config("./env");

const password = process.env.DB_PASSWORD;
console.log(password);

const url = `mongodb+srv://geetAdmin:${password}@tuludictionary.ks25c.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  // defines the shape of the documents within that collection.
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema); // fancy constructor

const note = new Note({
  // instance of a model : document
  content: "GET and POST are the most important methods of HTTP protocol",
  date: new Date(),
  important: true,
});

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
