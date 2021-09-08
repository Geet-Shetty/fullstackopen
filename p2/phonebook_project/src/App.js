import React, { useState } from "react";
import Info from "./components/Info.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "234-2340", id: 1 },
  ]);
  const [newName, setNewName] = useState("Add Name");
  const [newNumber, setNewNumber] = useState("Add Number");

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
