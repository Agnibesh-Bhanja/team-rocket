import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function next() {
    if (input === "prepare-for-trouble") {
      navigate("/rocket-control");
      return;
    }

    if (step === 0 && input === "8") setStep(1);
    else if (step === 1 && input === "rocket") setStep(2);
    else alert("Wrong. Try again.");

    setInput("");
  }

  return (
    <div>
      <h2>Help Center</h2>

      {step === 0 && <p>What is 5 + 3?</p>}
      {step === 1 && <p>Type villain team name</p>}
      {step === 2 && <p>Server overloaded. Try again later.</p>}

      {step < 2 && (
        <>
          <input onChange={e => setInput(e.target.value)} />
          <button onClick={next}>Submit</button>
        </>
      )}
    </div>
  );
}