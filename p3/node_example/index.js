// //https://github.com/FullStack-HY/part3-notes-backend/blob/part3-5/index.js
// //const Note = mongoose.model("Note", noteSchema); // fancy constructor

// // const http = require("http"); // node's built in web server
// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, { "Content-Type": "text/plain" });
// //   response.end("Hello World");
// // });
// // let notes = [
// //   {
// //     id: 1,
// //     content: "HTML is easy",
// //     date: "2019-05-30T17:30:31.098Z",
// //     important: true,
// //   },
// //   {
// //     id: 2,
// //     content: "Browser can execute only Javascript",
// //     date: "2019-05-30T18:39:34.091Z",
// //     important: false,
// //   },
// //   {
// //     id: 3,
// //     content: "GET and POST are the most important methods of HTTP protocol",
// //     date: "2019-05-30T19:20:14.298Z",
// //     important: true,
// //   },
// // ];

// // developed to ease server side development (middleware)
// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const Note = require("./models/note");

// app.use(cors());
// app.use(express.json()); // json-parser

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message });
//   }

//   next(error);
// };

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(requestLogger);

// // to handle HTTP GET requests made to the application's / root:
// // request parameter contains all of the information of the HTTP request
// // response parameter is used to define how the request is responded to
// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// //defines an event handler, that handles HTTP GET requests made to the notes path of the application:
// app.get("/api/notes", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// app.post("/api/notes", (request, response) => {
//   const body = request.body; //Without the json-parser, the body property would be undefined.

//   if (!body.content) {
//     // === undefined
//     // if null
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   // const note = {
//   //   content: body.content,
//   //   important: body.important || false,
//   //   date: new Date(), // date is done by server for consistency
//   // };
//   // notes = notes.concat(note);
//   // console.log(note);
//   // response.json(note);
//   note
//     .save()
//     .then((savedNote) => {
//       return savedNote.toJSON();
//     })
//     .then((savedAndFormattedNote) => {
//       response.json(savedAndFormattedNote);
//     });
// });

// app.get("/api/notes/:id", (request, response) => {
//   //   const id = request.params.id;
//   //   const note = notes.find((note) => {
//   //     console.log(note.id, typeof note.id, id, typeof id, note.id === id);
//   //     return note.id === id;
//   //   });
//   //   console.log(note);
//   //   response.json(note);
//   // const id = Number(request.params.id);
//   // const note = notes.find((note) => note.id === id);
//   // if (note) {
//   //   // if not null
//   //   response.json(note);
//   // } else {
//   //   response.status(404).end();
//   // }

//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// app.delete("/api/notes/:id", (request, response) => {
//   // const id = Number(request.params.id);
//   // notes = notes.filter((note) => note.id !== id);

//   // response.status(204).end();
//   Note.findByIdAndRemove(request.params.id)
//     .then((result) => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// // const generateId = () => {
// //   //This method is in fact not recommended, but we will live with it for now as we will replace it soon enough.
// //   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0; //The array can be transformed into individual numbers by using the "three dot" spread syntax ...
// //   return maxId + 1;
// // };

// app.put("/api/notes/:id", (request, response, next) => {
//   const body = request.body;

//   const note = {
//     content: body.content,
//     important: body.important,
//   };

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then((updatedNote) => {
//       response.json(updatedNote.toJSON());
//     })
//     .catch((error) => next(error));
// });

// // // set app and create http response to server
// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, { "Content-Type": "application/json" });
// //   response.end(JSON.stringify(notes));
// // });

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);

// app.use(errorHandler);

// // listen to port
// const PORT = process.env.PORT;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

// // nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
// //By development dependencies, we are referring to tools that are needed only during the development of the application, e.g. for testing or automatically restarting the application, like nodemon.

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/note");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => {
      response.json(savedAndFormattedNote);
    })
    .catch((error) => next(error));
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log("WAT IS THIS");
      next(error);
    });
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
