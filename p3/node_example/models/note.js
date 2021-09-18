const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config("./env");

const password = process.env.DB_PASSWORD;
console.log(password);

const url = process.env.DB_URL;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// const noteSchema = new mongoose.Schema({
//   // defines the shape of the documents within that collection.
//   content: String,
//   date: Date,
//   important: Boolean,
// });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);

/*
The public interface of the module is defined by setting a value to the 
module.exports variable. We will set the value to be the Note model. 
The other things defined inside of the module, like the variables mongoose 
and url will not be accessible or visible to users of the module.
*/
