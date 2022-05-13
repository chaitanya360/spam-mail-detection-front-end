import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [prediction, setPrediction] = useState(false);

  const fetchData = () => {
    fetch("");
  };

  return (
    <div className="App">
      <label>File name</label>
      <input />

      <button>Predict</button>
      <div className="output">output goes here</div>
    </div>
  );
}

export default App;
