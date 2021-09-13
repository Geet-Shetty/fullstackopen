import React from "react";

let AddForm = ({
  addInfo,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <>
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
    </>
  );
};

export default AddForm;
