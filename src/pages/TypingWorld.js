import React, { useState, useEffect } from "react";
import { Text } from "../helpers/Text";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function TypingWorld({ mode }) {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentBasicText, setCurrentBasicText] = useState(Text[0]);
  const [generateText, setGenerateText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [target, setTarget] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const navigate = useNavigate();

  const targetWord = mode === "basic" ? currentBasicText : generateText;

  // Fetches the text for advanced mode
  const fetchText = () => {
    Axios.get("https://api.api-ninjas.com/v1/facts", {
      headers: {
        "X-Api-Key": "G2q6tN+SMSI/UPtbpMLPUQ==rS9aRbMlCcfxVKqH",
      },
    })
      .then((res) => {
        const fetchedText = res.data[0].fact;
        setGenerateText(fetchedText);
        setTarget(fetchedText); // Ensure targetWord is set correctly
        setInput(""); // Reset input field
        clearInterval(intervalId); // Reset timer
        setTimer(0);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  useEffect(() => {
    // Load the saved index from local storage
    const savedIndex = localStorage.getItem("currentIndex");
    if (savedIndex !== null && mode === "basic") {
      setCurrentIndex(parseInt(savedIndex, 10));
      setCurrentBasicText(Text[parseInt(savedIndex, 10)]);
    }
    if (mode === "advanced") {
      fetchText();
    }
  }, [mode]);

  useEffect(() => {
    if (input.length === targetWord.length) {
      clearInterval(intervalId); // Stop the timer when typing is complete
    }
  }, [input, targetWord]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (input.length === 0 && value.length === 1) {
      // Start the timer when the user starts typing
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
    }

    if (value.length <= targetWord.length) {
      if (value[value.length - 1] !== targetWord[value.length - 1]) {
        setMistakes(mistakes + 1);
      }
      setInput(value);
    }
  };

  const handleTextCompletion = () => {
    clearInterval(intervalId); // Stop the timer when the user moves to the next text
    if (mode === "basic") {
      let newIndex;
      if (currentIndex < Text.length - 1) {
        newIndex = currentIndex + 1;
      } else {
        newIndex = 0;
      }
      setCurrentIndex(newIndex);
      setCurrentBasicText(Text[newIndex]);

      // Save the new index to local storage
      localStorage.setItem("currentIndex", newIndex);
    } else {
      fetchText();
    }
    setInput("");
    setMistakes(0);
    setTimer(0);
  };

  const back = () => {
    clearInterval(intervalId);
    navigate("/");
  };

  const resetInput = () => {
    clearInterval(intervalId);
    setInput("");
    setMistakes(0);
    setTimer(0);
  };

  const cpm = input.length > 0 ? input.length / (timer / 60) : 0;
  const wpm = input.length > 0 ? input.length / 5 / (timer / 60) : 0;
  const accuracy =
    input.length > 0 ? ((input.length - mistakes) / input.length) * 100 : 100;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-[url('/src/assets/game-bg.jpg')]">
      <div className="border-8 border-cyan-300 rounded-2xl mx-5 p-4 md:mx-24 lg:mx-32 xxl:mx-40">
        {targetWord.split("").map((char, index) => {
          let backgroundColor = "bg-slate-100"; // Default background

          if (index < input.length) {
            backgroundColor =
              input[index] === char ? "bg-green-500" : "bg-red-500";
          }

          return (
            <span
              key={index}
              className={`inline-block my-1 border mx-1 rounded-lg px-4 text-center md:text-lg w-6 ${backgroundColor}`}
            >
              {char}
            </span>
          );
        })}
      </div>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className=" p-4 outline-none text-lg border-b-4 border-cyan-300 bg-transparent text-white text-center md:w-3/4 xsm:w-full"
        disabled={input.length >= targetWord.length}
      />
      <div className="flex items-center justify-center rounded-2xl border-4 border-cyan-300 mx-4 text-[10px] p-4 mt-60">
        <div className="flex items-center justify-center space-x-6 text-white lg:text-lg">
          <p>WPM: {Math.round(wpm)}</p>
          <p>CPM: {Math.round(cpm)}</p>
          <p>Mistakes: {mistakes}</p>
          <p>Accuracy: {Math.round(accuracy)}%</p>
          <p>Time: {timer} seconds</p>
        </div>
      </div>
      <div className="flex space-x-28 md:space-x-32 lg:space-x-60">
        <button
          onClick={back}
          className="reset-button px-4 py-2 bg-white text-black rounded-lg cursor-pointer mt-4 md:px-2 xsm:px-1 "
        >
          Back
        </button>
        <button
          onClick={resetInput}
          className="reset-button px-4 py-2 bg-white text-black rounded-lg cursor-pointer mt-4 md:px-2 xsm:px-1 "
        >
          Reset
        </button>
        <button
          onClick={handleTextCompletion}
          disabled={input.length < targetWord.length}
          className="next-button px-4 py-2 bg-white text-black rounded-lg cursor-pointer mt-4 md:px-2 xsm:px-1 "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TypingWorld;
