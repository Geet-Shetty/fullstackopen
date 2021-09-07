import React from "react";
import Note from "./components/Note.js"; // person refers to the current dir

const App = ({ notes }) => {
  // can also do key={i} THO NOT RECOMMENDED CUZ ISSUES
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
