// how to use guide: https://fullstackopen.com/en/part1/introduction_to_react
// COMPONENT NAMES Must have first letter caps
// can use <> instead of <div> because divs show up in the dom tree
/**
The useState function (as well as the useEffect function introduced later on in the course)
must not be called from inside of a loop, a conditional expression, or any place that is
not a function defining a component. This must be done to ensure that the hooks are always 
called in the same order, and if 
this isn't the case the application will behave erratically.

hooks may only be called from the inside of a function body that defines a React component
https://reactjs.org/docs/hooks-rules.html 
 */
//Never define components inside of other components. The biggest problems are due to the fact that React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.

// const Hello = (props) => {
//   return (
//     <>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>
//     </>
//   );
// };

// const App = () => {
//   const name = "Peter";
//   const age = 10;

//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </>
//   );
// };

// const Title = (props) => {
//   return (
//     <>
//       <h1>{props.name}</h1>
//     </>
//   );
// };
// const Sections = (props) => {
//   const Part = ({ key, name, exercises }) => {
//     return (
//       <>
//         <h2>{name}</h2>
//         <h3>Exercises: {exercises}</h3>
//       </>
//     );
//   };
//   let tags = [];
//   let key_id = 0;
//   props.list.forEach(({ name, exercises }) => {
//     console.log("name " + name + " # " + exercises);
//     tags.push(<Part key={key_id++} name={name} exercises={exercises} />); // if using concant then must to tags = tags.concat(...)
//   });
//   console.log(tags);
//   return <div>{tags}</div>;
// };
// const App = () => {
//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: -7,
//       },
//       {
//         name: "State of a component",
//         exercises: 99,
//       },
//     ],
//   };
//   // <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
//   // <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
//   // <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
//   return (
//     <>
//       <Title name={course.name} />
//       <Sections list={course.parts} />
//     </>
//   );
//   // could make a function that only takes in the object but i like this organization
// };

// const App = (props) => {
//   const { counter } = props;
//   return <div>{counter}</div>;
// };

// const Display = ({ counter }) => {
//   return <div>{counter}</div>;
// };
// const Button = ({ onClick, text }) => {
//   return <button onClick={onClick}>{text}</button>;
// };
// const App = () => {
//   const [counter, setCounter] = useState(0);
//   // setTimeout(() => setCounter(counter + 1), 1000);
//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const setToZero = () => setCounter(0);
//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="plus" />
//       <Button onClick={decreaseByOne} text="minus" />
//       <Button onClick={setToZero} text="zero" />
//     </div>
//   );
// };

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0,
//   });

//   // const handleLeftClick = () => {
//   //   const newClicks = {
//   //     left: clicks.left + 1,
//   //     right: clicks.right
//   //   }
//   //   setClicks(newClicks)
//   // }

//   // const handleRightClick = () => {
//   //   const newClicks = {
//   //     left: clicks.left,
//   //     right: clicks.right + 1
//   //   }
//   //   setClicks(newClicks)
//   // }

//   // DONT DO THIS BECAUSE WE DONT WANNA MUTUATE THINGS, COPY UNCHANGED AND SET NEW VALS
//   // const handleLeftClick = () => {
//   //   clicks.left++
//   //   setClicks(clicks)
//   // }

//   const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });

//   const handleRightClick = () =>
//     setClicks({ ...clicks, right: clicks.right + 1 });

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   );
// };

// const Button = ({ onClick, text }) => {
//   return <button onClick={onClick}>{text}</button>;
// };
// const History = (props) => {
//   // NOT console.log('props value is ' + props)
//   console.log("props value is", props);
//   if (props.allClicks.length === 0) {
//     return <div>the app is used by pressing the buttons</div>;
//   }
//   return <div>button press history: {props.allClicks.join(" ")}</div>;
// };
// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat("R")); // concat instead of push to avoid mutating
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   );
// };

// const App = () => {
//   const [value, setValue] = useState(10);

//   const hello = (who) => {
//     return () => {
//       console.log("hello", who);
//     };
//     // many other ways to return
//   };

//   return (
//     <div>
//       {value}
//       <button onClick={hello("world")}>button</button>
//       <button onClick={hello("react")}>button</button>
//       <button onClick={hello("function")}>button</button>
//     </div>
//   );
// };

// const App = () => {
//   const [value, setValue] = useState(10);

//   const setToValue = (newValue) => () => {
//     setValue(newValue);
//   }; // this is a workaround to avoiding unwanted behaviors of just using setValue to define a handler

//   return (
//     <div>
//       {value}
//       <button onClick={setToValue(1000)}>thousand</button>
//       <button onClick={setToValue(0)}>reset</button>
//       <button onClick={setToValue(value + 1)}>increment</button>
//     </div>
//   );
// };
