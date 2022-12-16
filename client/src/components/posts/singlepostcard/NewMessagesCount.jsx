import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMessage } from '../../../hooks/MessageHooks';
import { FaEnvelope } from 'react-icons/fa';

export function NewMessagesCount({ post }) {
  const { getViewedMessages, messageArray } = useMessage(post.id);
  const [viewedMessagesCount, setViewedMessagesCount] = useState(0);

  const fetchViewedMessages = async () => {
    const msg = await getViewedMessages(post.id);
    if (msg.length > 0) {
      setViewedMessagesCount(msg.length);
    }
  };

  useEffect(() => {
    fetchViewedMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    messageArray.length - viewedMessagesCount > 0 && (
      <div id="new-message-count">
        <h4 className="no-margin">
          {messageArray.length - viewedMessagesCount}
        </h4>
        <FaEnvelope id={'message-icon'} />
      </div>
    )
  );
}

NewMessagesCount.propTypes = {
  post: PropTypes.object,
};
