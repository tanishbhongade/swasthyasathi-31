import styles from "./UserInputSection.module.css";
import PropTypes from "prop-types";

function UserInputSection({ userInput, handleUserInput }) {
  return (
    <div>
      <input
        type="text"
        placeholder="What is your query?"
        onChange={handleUserInput}
        value={userInput}
        className={styles.userInputTextArea}
      />
    </div>
  );
}

export default UserInputSection;

UserInputSection.propTypes = {
  userInput: PropTypes.string.isRequired, // userInput must be a string and is required
  handleUserInput: PropTypes.func.isRequired, // handleUserInput must be a function and is required
};
