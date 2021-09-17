import List from "./components/List.js";
import AddForm from "./components/AddForm.js";
import Notification from "./components/Notification";
import personService from "./services/person";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  //{ name: "Arto Hellas", number: "234-2340", id: 1 },
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Add Name");
  const [newNumber, setNewNumber] = useState("Add Number");
  const [notiMessage, setNotiMessage] = useState(null);
  const [status, setStatus] = useState(false);

  const hook = () => {
    console.log("effect");
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   setPersons(response.data);
    // });
    personService
      .getAll()
      .then((person_list) => {
        setPersons(person_list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(hook, []); // If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

  const setNotification = (message, status) => {
    setStatus(status);
    setNotiMessage(message);
    setTimeout(() => {
      setNotiMessage(null);
    }, 5000);
  };

  const addInfo = (event) => {
    event.preventDefault();

    let dups = persons.filter((person) => person.name === newName); // USE FIND INSTEAD U FUCKEN MORON SO U DONT HAVE TO DO DUPS[0]
    if (dups.length > 0) {
      //window.alert(`${newName} is a dup!`);
      // if (window.confirm(`Replace old number for ${newName}`)) {
      // const changedPerson = { ...dups[0], number: newNumber };
      // personService
      //   .update(dups[0].id, changedPerson)
      //   .then((newPerson) => {
      //     setPersons(
      //       persons.map((person) => {
      //         return person.id !== dups[0].id ? person : newPerson;
      //       })
      //     );
      //   })
      //   .catch((error) => {
      //     setNotification(`${dups[0].name} has already been deleted`, false);
      //   });
      // setNotification(`Changed ${newName} Number`, true);
    }
    // } else {
    const info = {
      name: newName,
      number: newNumber,
    };
    personService
      .create(info)
      .then((person) => {
        setPersons(persons.concat(person));
      })
      .catch((error) => {
        console.log(error);
      });
    setNotification(`Added ${newName} Number`, true);
    //setPersons(persons.concat(info));
    // }
    setNewName("");
    setNewNumber("");
  };

  // because these are the same could just make a function do make both these functions
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // could make into add new, and numbers components but moving on
  return (
    <div>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} status={status} />
      <AddForm
        addInfo={addInfo}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <List persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
