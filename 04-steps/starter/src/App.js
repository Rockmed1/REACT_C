import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

//STATE: treat state as immutable in REACT
//1) add a state variable. useState hook can only be used inside the first level of a react component and not inside a if statement.
//2) use in the code (JSX)
//3) use update the piece of state in the event handler

function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}

function Steps() {
  //1)
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // const [test, setTest] = useState({ name: 'jonas' });

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1); // for updating the state based on the current state always use callback function to update the state
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    // setTest({ name: 'Fred' });// this is the way to do it

    //BAD PRACTICE
    // test.name = 'Fred';
  }
  return (
    <div>
      <button className="close" onClick={() => setIsOpen((o) => !o)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
              {" "}
              <span>👈</span>Previous
            </Button>
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handleNext}
              text="Next">
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
