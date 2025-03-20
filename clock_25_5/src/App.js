import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      audioRef.current.play();
      if (isSession) {
        setTimeLeft(breakLength * 60);
        setTimerLabel("Break");
        setIsSession(false);
      } else {
        setTimeLeft(sessionLength * 60);
        setTimerLabel("Session");
        setIsSession(true);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, breakLength, sessionLength, isSession]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (!isSession && !isRunning) {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (!isSession && !isRunning) {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (isSession && !isRunning) {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (isSession && !isRunning) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    setIsSession(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="App">
      <div id="clock">
        <h1>25 + 5 Clock</h1>

        <div className="length-controls">
          <div className="break-control">
            <h2 id="break-label">Break Length</h2>
            <div className="control-buttons">
              <button id="break-decrement" onClick={handleBreakDecrement}>
                -
              </button>
              <span id="break-length">{breakLength}</span>
              <button id="break-increment" onClick={handleBreakIncrement}>
                +
              </button>
            </div>
          </div>

          <div className="session-control">
            <h2 id="session-label">Session Length</h2>
            <div className="control-buttons">
              <button id="session-decrement" onClick={handleSessionDecrement}>
                -
              </button>
              <span id="session-length">{sessionLength}</span>
              <button id="session-increment" onClick={handleSessionIncrement}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className="timer">
          <h2 id="timer-label">{timerLabel}</h2>
          <div id="time-left">{formatTime(timeLeft)}</div>
          <div className="timer-controls">
            <button id="start_stop" onClick={handleStartStop}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <audio
          id="beep"
          ref={audioRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
