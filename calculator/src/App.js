import React, { useActionState, useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [lastWasOperator, setLastWasOperator] = useState(false);
  const [lastWasEquals, setLastWasEquals] = useState(false);

  const handleNumber = (number) => {
    if (lastWasEquals) {
      setEquation(number);
      setLastWasEquals(false);
    } else {
      if (equation === "0" && number !== ".") {
        setEquation(number);
      } else {
        setEquation(equation + number);
      }
    }
    setLastWasOperator(false);
  };

  const handleOperator = (operator) => {
    if (lastWasEquals) {
      setEquation(equation + operator);
      setLastWasEquals(false);
    } else {
      if (lastWasOperator) {
        if (equation[equation.length - 1] === "-" && operator !== "-") {
          const newEquation = equation.slice(0, -2) + operator;
          setEquation(newEquation);
        } else if (operator === "-") {
          setEquation(equation + operator);
        } else {
          const newEquation = equation.slice(0, -1) + operator;
          setEquation(newEquation);
        }
      } else {
        setEquation(equation + operator);
      }
    }
    setLastWasOperator(true);
  };

  const handleEquals = () => {
    if (lastWasEquals) return;

    const finalEquation = equation;
    try {
      const result = Function('"use strict";return (' + finalEquation + ")")();
      const formattedResult = Number.isInteger(result)
        ? result.toString()
        : result.toFixed(4).replace(/\.?0+$/, "");
      setEquation(formattedResult);
      setLastWasEquals(true);
    } catch (error) {
      setEquation("Error");
      setLastWasEquals(true);
    }
  };

  const handleClear = () => {
    setEquation("0");
    setLastWasOperator(false);
    setLastWasEquals(false);
  };

  const handleDecimal = () => {
    if (lastWasEquals) {
      setEquation("0.");
      setLastWasEquals(false);
    } else if (lastWasOperator) {
      setEquation(equation + "0.");
      setLastWasOperator(false);
    } else {
      const lastOperatorIndex = Math.max(
        equation.lastIndexOf("+"),
        equation.lastIndexOf("-"),
        equation.lastIndexOf("*"),
        equation.lastIndexOf("/")
      );

      const currentNumber = equation.slice(lastOperatorIndex + 1);

      if (!currentNumber.includes(".")) {
        setEquation(equation + ".");
      }
    }
  };

  return (
    <div className="calculator">
      <div id="display">{equation}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>
          AC
        </button>
        <button id="divide" onClick={() => handleOperator("/")}>
          /
        </button>
        <button id="multiply" onClick={() => handleOperator("*")}>
          ×
        </button>
        <button id="subtract" onClick={() => handleOperator("-")}>
          -
        </button>
        <button id="seven" onClick={() => handleNumber("7")}>
          7
        </button>
        <button id="eight" onClick={() => handleNumber("8")}>
          8
        </button>
        <button id="nine" onClick={() => handleNumber("9")}>
          9
        </button>
        <button id="add" onClick={() => handleOperator("+")}>
          +
        </button>
        <button id="four" onClick={() => handleNumber("4")}>
          4
        </button>
        <button id="five" onClick={() => handleNumber("5")}>
          5
        </button>
        <button id="six" onClick={() => handleNumber("6")}>
          6
        </button>
        <button id="equals" onClick={handleEquals}>
          =
        </button>
        <button id="one" onClick={() => handleNumber("1")}>
          1
        </button>
        <button id="two" onClick={() => handleNumber("2")}>
          2
        </button>
        <button id="three" onClick={() => handleNumber("3")}>
          3
        </button>
        <button id="zero" onClick={() => handleNumber("0")}>
          0
        </button>
        <button id="decimal" onClick={handleDecimal}>
          .
        </button>
      </div>
    </div>
  );
}

export default App;
