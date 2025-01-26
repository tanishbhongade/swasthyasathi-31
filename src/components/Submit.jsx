import PropTypes from "prop-types";
import axios from "axios";
import styles from "./Submit.module.css"

const API_URL =
  "https://ai-chatbot-1.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=AIBlitzTesting&api-version=2021-10-01&deploymentName=test";
const API_KEY =
  "2hOLsQtwI23o0STcsdOONVyzN6QkbbnBIV64FHVEkJGtVoPPjnXVJQQJ99BAAC1i4TkXJ3w3AAAaACOG41oK";

async function getResponseFromAI(userInput) {
  try {
    const response = await axios.post(
      API_URL,
      {
        question: userInput,
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY, // Add your authorization header
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.answers[0].answer);
    return response.data.answers[0]?.answer || "No answer found!";
  } catch (error) {
    console.error("Error fetching answer from Language Studio:", error);
    return "Sorry, I couldn't get an answer. Please try again.";
  }
}

async function handleSubmit(
  event,
  changeUserPrompts,
  changeAiResponses,
  userInput,
  userPreviousPrompts
) {
  if (userInput.trim()) {
    const updatedUserPrompts = [...userPreviousPrompts, userInput];
    changeUserPrompts(() => updatedUserPrompts);

    try {
      const receivedResponse = await getResponseFromAI(userInput);
      console.log(receivedResponse);
      if (receivedResponse != null) {
        changeAiResponses((prevResponses) => [
          ...prevResponses,
          receivedResponse,
        ]);
      } else {
        changeAiResponses((prevResponses) => [
          ...prevResponses,
          "No valid response",
        ]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      changeAiResponses((prevResponses) => [
        ...prevResponses,
        "Error retrieving response",
      ]);
    }
  }
}

function Submit({
  changeUserPrompts,
  changeAiResponses,
  userInput,
  userPreviousPrompts,
}) {
  return (
    <div className={styles.submitBtn}>
      <button
        onClick={(e) =>
          handleSubmit(
            e,
            changeUserPrompts,
            changeAiResponses,
            userInput,
            userPreviousPrompts
          )
        }
      >
        Submit
      </button>
    </div>
  );
}

export default Submit;

Submit.propTypes = {
  changeUserPrompts: PropTypes.func.isRequired, // Must be a function and required
  changeAiResponses: PropTypes.func.isRequired, // Must be a function and required
  userInput: PropTypes.string.isRequired, // Must be a string and required
  userPreviousPrompts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
