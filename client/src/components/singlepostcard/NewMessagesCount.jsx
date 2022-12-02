import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMessage } from '../../hooks/MessageHooks';

export function NewMessagesCount({ post }) {
  const { getViewedMessages, messageArray } = useMessage(post.id);
  const [viewedMessages, setViewedMessages] = useState([]);
  const [viewedMessagesCount, setViewedMessagesCount] = useState(0);

  const fetchViewedMessages = async () => {
    const msg = await getViewedMessages(post.id);
    msg && setViewedMessages(msg);
    if (msg.length > 0) {
      console.log(`msg length: ${msg.length}`);
      setViewedMessagesCount(msg.length);
    }
  };

  useEffect(() => {
    fetchViewedMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="new-message-count">
      {/* {messageArray.length - viewedMessages.length}New Messages */}
      {messageArray.length - viewedMessagesCount} New Messages
    </div>
  );
}

NewMessagesCount.propTypes = {
  post: PropTypes.object,
};
