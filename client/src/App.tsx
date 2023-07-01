import React from "react";
import "./App.css";
import Time from "./components/Time";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <Time />
      <Weather />
    </div>
  );
}

export default App;
