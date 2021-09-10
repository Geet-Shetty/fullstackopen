import Info from "./components/Info.js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  //{ name: "Arto Hellas", number: "234-2340", id: 1 },
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Add Name");
  const [newNumber, setNewNumber] = useState("Add Number");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []); // If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

  const addInfo = (event) => {
    event.preventDefault();

    let dups = persons.filter((person) => person.name === newName);

    if (dups.length > 0) {
      window.alert(`${newName} is a dup!`);
    } else {
      const info = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(info));
    }
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

  // could make into add new, and numbers components but moving on
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <h2>Add New</h2>
      <form onSubmit={addInfo}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => {
            return <Info key={person.id} person={person} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
