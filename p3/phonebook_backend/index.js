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
const morgan = require("morgan");
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log(typeof request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json()); // The express json-parser we took into use earlier is a so-called middleware.
app.use("/api/persons", requestLogger);
app.use(
  "/api/persons",
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<h1>Phonebook has info for ${
      persons.length
    } people.</h1><h2>${new Date()}</h2>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    // if not null
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
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
  } else if (
    persons.find((person) => {
      return person.name === body.name;
    })
  ) {
    return response.status(400).json({
      error: "name dup",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(persons),
  };
  persons = persons.concat(person);
  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
