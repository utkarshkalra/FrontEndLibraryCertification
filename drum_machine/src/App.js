import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const drumPads = [
  {
    id: "Heater-1",
    key: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    id: "Heater-2",
    key: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    id: "Heater-3",
    key: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    id: "Heater-4",
    key: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    id: "Clap",
    key: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    id: "Open-HH",
    key: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    id: "Kick-n-Hat",
    key: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    id: "Kick",
    key: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    id: "Closed-HH",
    key: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [display, setDisplay] = useState("");
  const audioRefs = useRef({});

  const playSound = async (pad) => {
    try {
      const audio = audioRefs.current[pad.key];
      if (!audio) return;

      audio.currentTime = 0;
      await audio.play();
      setDisplay(pad.id);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const pad = drumPads.find((pad) => pad.key === event.key.toUpperCase());
      if (pad) {
        playSound(pad);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="display">{display}</div>
        <div className="drum-pads">
          {drumPads.map((pad) => (
            <div
              key={pad.id}
              className="drum-pad"
              id={pad.id}
              onClick={() => playSound(pad)}
            >
              {pad.key}
              <audio
                className="clip"
                id={pad.key}
                src={pad.audio}
                ref={(el) => (audioRefs.current[pad.key] = el)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
