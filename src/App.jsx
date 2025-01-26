import { useState } from "react";
import styles from "./App.module.css";
import PrintPreviousChats from "./components/PrintPreviousChats";
import UserInputSection from "./components/UserInputSection";
import Submit from "./components/Submit";
import Heading from './components/Heading'

function App() {
  const [userPreviousPrompts, changeUserPrompts] = useState([]);
  const [aiPreviousResponses, changeAiResponses] = useState([]);

  const [userInput, changeUserInput] = useState("");

  function handleUserInput(e) {
    changeUserInput(e.target.value);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInterface}>
        <Heading />
        <PrintPreviousChats
          userPreviousPrompts={userPreviousPrompts}
          aiPreviousResponses={aiPreviousResponses}
        />
        <div className={styles.inpsec}>
          <UserInputSection
            handleUserInput={handleUserInput}
            userInput={userInput}
          />
          <Submit
            changeUserPrompts={changeUserPrompts}
            changeAiResponses={changeAiResponses}
            userPreviousPrompts={userPreviousPrompts}
            userInput={userInput}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
