import React from "react";
import Info from "./Info";

let List = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => {
            return <Info key={person.id} person={person} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
