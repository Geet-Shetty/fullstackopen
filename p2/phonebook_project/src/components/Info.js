import React from "react";

const Info = ({ person }) => {
  return (
    <tr>
      <td>{person.name} </td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => {}}>delete</button>
      </td>
    </tr>
  );
};

export default Info;
