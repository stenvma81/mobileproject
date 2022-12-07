import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMessage } from '../../hooks/MessageHooks';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './messages.css';

export function SendMessage({ postid }) {
  const [text, setText] = useState('empty');
  const { uploadMessage } = useMessage(postid);
  const { update, setUpdate, user } = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = { text: text, userid: user.id, postid: postid };
    const response = await uploadMessage(msg);
    if (response) {
      setText('');
      setUpdate(update + 1);
      alert('Message has been submitted');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="no-margin">Message:</p>
      <label id="send-message-div">
        <textarea
          placeholder="message"
          className="message-textfield"
          name="text"
          rows="6"
          onChange={(e) => setText(e.target.value)}
        />
        <button id="send-msg-btn" type="send">
          Send
          <FaAngleDoubleRight id="send-arrow" />
        </button>
      </label>
    </form>
  );
}

SendMessage.propTypes = {
  postid: PropTypes.number.isRequired,
};
