import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

// npx json-server --port 3001 --watch db.json
//NB npm-commands should always be run in the project root directory, which is where the package.json file can be found.
// do npm run server instead of npm start for getting the db up
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   ReactDOM.render(
//     <App notes={notes} />,
//     document.getElementById('root')
//   )
// }) method is problematic

// const promise = axios.get("http://localhost:3001/notes");
// console.log(promise);

// promise.then((response) => {
//   console.log(response);
// });

// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);
