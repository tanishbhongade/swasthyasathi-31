import styles from "./PrintPreviousChats.module.css";
import PropTypes from "prop-types";
function PrintPreviousChats({ aiPreviousResponses, userPreviousPrompts }) {
  return (
    <div className={styles.previousChatsBlock}>
      <div>
        {(aiPreviousResponses || []).map((res, index) => {
          return (
            <div key={index} className={styles.aiResponseBlock}>
              {res}
            </div>
          );
        })}
      </div>
      <div>
        {(userPreviousPrompts || []).map((res, index) => {
          return (
            <div key={index} className={styles.userPromptsBlock}>
              {res}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PrintPreviousChats;

PrintPreviousChats.propTypes = {
  aiPreviousResponses: PropTypes.arrayOf(PropTypes.string),
  userPreviousPrompts: PropTypes.arrayOf(PropTypes.string),
};
