import { useState } from 'react';
import { useMessage } from '../../hooks/MessageHooks'

export function SendMessage() {
  const [text, setText] = useState('empty');
  const { uploadMessage } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem('token'));
    const msg = { text: text, userid: userInfo.user.id, postid: 1 };
    await uploadMessage(msg);
    setText('');
  };

  return (
    <div className="send-message-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Message:</p>
          <textarea
            id="message-textfield"
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
