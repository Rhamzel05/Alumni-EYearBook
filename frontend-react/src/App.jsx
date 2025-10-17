import React from "react";
//Hooks  - useEffect, useState, useRef, useContext
import { useState } from "react";
import PrimaryButton from "./components/PrimaryButton";
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
    <h1>Hello React {count}</h1>
    <PrimaryButton label="Click Me" onClick={() => setCount((count) => count + 1)} />
    </>
  );
};

export default App;