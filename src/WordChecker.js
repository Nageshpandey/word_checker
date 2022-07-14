import React,{ useEffect, useState } from "react";

function WordChecker() {
  const [input, setInput] = useState("");
  const [alphabet, setAlphabet] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const checkInput = (e) => {
    if (e.target.value.length === 20) {
      setIsActive(false);
      let score = window.document.getElementById("time").innerHTML;
      let arr = score.split(" ");
      let getScore = arr[1].slice(0, arr[1].length - 2);
      if (
        window.localStorage.getItem("HighScore") &&
        window.localStorage.getItem("HighScore") < parseFloat(getScore)
      ) {
        setAlphabet("Failure⚠");
      } else {
        setAlphabet("Success!🎉");
        window.localStorage.setItem("HighScore", parseFloat(getScore));
      }
    } else {
      let last = e.target.value.charAt(e.target.value.length - 1);
      if (last.toUpperCase() === alphabet) {
        setInput(e.target.value.toUpperCase());
        generateAlphabet();
        setIsActive(true);
        setIsPaused(false);
      } else {
        setTime(time + 500);
      }
    }
  };
  const reset = () => {
    setInput("");
    setIsActive(false);
    setTime(0);
    generateAlphabet();
  };

  const generateAlphabet = () => {
    let number = Math.floor(Math.random() * 26) + 65;
    let char = String.fromCharCode(number);
    setAlphabet(char);
  };

  useEffect(() => {
    generateAlphabet();
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (
    <div className="App">
      <div className="set">
        {" "}
        <h2>Type The Alphabet</h2>
        <p>
          {" "}
          {`Typing game to see how fast you type. Timer starts when you do :)`}
        </p>
        <div className="square">
          <p> {alphabet} </p>
        </div>
      </div>

      <div className="score">
        <p className="time" id="time">
          Time: {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
          {(time / 1) % 1000}s
        </p>

        <p className="color">
          my best time:{" "}
          {window.localStorage.getItem("HighScore") &&
            window.localStorage.getItem("HighScore")}
        </p>
      </div>
      <div className="text">
        <input
          type="text"
          className="input"
          maxLength={20}
          value={input}
          placeholder="Type Here..."
          onChange={checkInput}
        />
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default WordChecker