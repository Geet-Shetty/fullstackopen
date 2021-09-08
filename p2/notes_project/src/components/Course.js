import React from "react";

const Title = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

const Part = ({ part }) => {
  let { name, exercises } = part;
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

let Course = ({ course }) => {
  let { name, parts } = course;
  let total = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);
  console.log(total);
  return (
    <>
      <Title name={name} />
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <Part part={{ name: "Total Number of Exercises", exercises: total }} />
    </>
  );
};

export default Course;
