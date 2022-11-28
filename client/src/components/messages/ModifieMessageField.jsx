import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useState } from 'react';
import { MainContext } from '../../context/MainContext';
import { useMessage } from '../../hooks/MessageHooks';

export function ModifieMessageField({ message, setIsModifying }) {
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
    }
  };

  return (
    <div>
      <textarea
        defaultValue={message.text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Apply</button>
      <button onClick={() => setIsModifying(false)}>Cancel</button>
    </div>
  );
}

ModifieMessageField.propTypes = {
  message: PropTypes.object.isRequired,
  setIsModifying: PropTypes.func.isRequired,
};
