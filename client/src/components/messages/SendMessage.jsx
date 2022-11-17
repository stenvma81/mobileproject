import { useState } from 'react';

export function SendMessage() {
  const [text, setText] = useState();

  const addMessage = async () => {
    const msg = { text: text, userid: 1, postid: 1 };
    console.log(JSON.stringify(msg));
    try {
      await fetch(`http://localhost:8000/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
      });
    } catch (error) {
      console.error('addMessage/client', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMessage();
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
