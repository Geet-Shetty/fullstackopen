let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const errorHandler = (error, request, response, next) => {
  console.log("ran");
  // console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(cors());
app.use(express.json()); // The express json-parser we took into use earlier is a so-called middleware.

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log(typeof request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.use(
  "/api/persons",
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<h1>Phonebook has info for ${
      persons.length
    } people.</h1><h2>${new Date()}</h2>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person); // found and returing
      } else {
        response.status(404).end(); // not found with correctly formatted id
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = (persons) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  let id = getRandomInt(2000000); // Number.MAX_SAFE_INTEGER
  //   console.log(
  //     "test",
  //     persons.find((person) => {
  //       person.id === id;
  //     }) !== undefined
  //   );
  while (
    persons.find((person) => {
      return person.id === id;
    })
  ) {
    // console.log(
    //   persons.find((person) => {
    //     person.id === id;
    //   })
    // );
    id = getRandomInt(2000000);
  }
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body; //Without the json-parser, the body property would be undefined.

  if (!body.name || !body.number) {
    // console.log(body);
    return response.status(400).json({
      error: "name missing",
    });
  }
  // else if (
  //   persons.find((person) => {
  //     return person.name === body.name;
  //   })
  // ) {
  //   return response.status(400).json({
  //     error: "name dup",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  // persons = persons.concat(person);
  // response.json(person);

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
