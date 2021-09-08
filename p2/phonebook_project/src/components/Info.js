import React from "react";

const Info = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  );
};

export default Info;
