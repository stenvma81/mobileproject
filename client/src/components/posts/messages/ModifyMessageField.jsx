import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { MainContext } from '../../../context/MainContext';
import { useMessage } from '../../../hooks/MessageHooks';

export function ModifyMessageField({ message, setIsModifying }) {
  const [text, setText] = useState('');
  const { modifyMessage } = useMessage(message.postid);
  const { update, setUpdate } = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modifiedMsg = { text: text, id: message.id };
    const response = await modifyMessage(modifiedMsg);
    if (response) {
      setUpdate(update + 1);
      setIsModifying(false);
      alert('Message has been modified');
      return;
    }
    alert('Failed to modify message');
  };

  return (
    <form className="column" onSubmit={handleSubmit}>
      <textarea
        className="message-textfield"
        rows="4"
        defaultValue={message.text}
        onChange={(e) => setText(e.target.value)}
        required
        minLength="1"
        maxLength="250"
      />
      <div className="two-icons-message">
        <button id="modify-post-btn">
          <FaCheck />
        </button>
        <FaTimes onClick={() => setIsModifying(false)} />
      </div>
    </form>
  );
}

ModifyMessageField.propTypes = {
  message: PropTypes.object.isRequired,
  setIsModifying: PropTypes.func.isRequired,
};
