import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMessage } from '../../hooks/MessageHooks';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

export function SendMessage({ postid }) {
  const [text, setText] = useState('empty');
  const { uploadMessage } = useMessage(postid);
  const { update, setUpdate } = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userInfo = JSON.parse(sessionStorage.getItem('token'));
    const msg = { text: text, userid: userInfo.user.id, postid: postid };
    const response = await uploadMessage(msg);
    if (response) {
      setText('');
      setUpdate(update + 1);
      alert('Message has been submitted');
    }
  };

  return (
    <div className="send-message-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Message:</p>
          <textarea
            id="message-textfield"
            required
            minLength="1"
            maxLength="250"
            name="text"
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <div>
          <button id="send-msg-btn" type="send">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

SendMessage.propTypes = {
  postid: PropTypes.number.isRequired,
};
