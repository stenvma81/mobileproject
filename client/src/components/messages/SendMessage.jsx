import { useState } from "react";
import PropTypes from "prop-types";
import { useMessage } from "../../hooks/MessageHooks";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { FaAngleDoubleRight } from "react-icons/fa";

export function SendMessage({ postid }) {
  const [text, setText] = useState("empty");
  const { uploadMessage } = useMessage(postid);
  const { update, setUpdate } = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userInfo = JSON.parse(sessionStorage.getItem("token"));
    const msg = { text: text, userid: userInfo.user.id, postid: postid };
    const response = await uploadMessage(msg);
    if (response) {
      setText("");
      setUpdate(update + 1);
    }
  };

  return (
    <div className="send-message-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Message:</p>
          <div id="send-message-div">
            <input
              placeholder="message"
              id="message-textfield"
              name="text"
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button id="send-msg-btn" type="send">
              Send
              <FaAngleDoubleRight id="send-arrow" />
            </button>
          </div>
        </label>
      </form>
    </div>
  );
}

SendMessage.propTypes = {
  postid: PropTypes.number.isRequired,
};
