import { useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './messages.css';
import { useMessage } from '../../../hooks/MessageHooks';
import { MainContext } from '../../../context/MainContext';

export function SendMessage({ postid }) {
  const [text, setText] = useState('');
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
    <form id="send-message-form" onSubmit={handleSubmit}>
      <p className="no-margin">Write Message:</p>
      <div id="send-message-div" className="column">
        <textarea
          className="message-textfield"
          name="text"
          rows="6"
          required
          minLength="1"
          maxLength="250"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button id="send-msg-btn" type="send">
          Send
          <FaAngleDoubleRight id="send-arrow" />
        </button>
      </div>
    </form>
  );
}

SendMessage.propTypes = {
  postid: PropTypes.number.isRequired,
};
