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
      // Make a list of objects without IDs
      const newList = msg.map(({ id, ...rest }) => ({ ...rest }));

      // Create a set for getting rid of duplicates
      const set = new Set();
      for (let item in newList) {
        // console.log(newList[item]);
        set.add(JSON.stringify(newList[item]));
      }

      setViewedMessagesCount(set.size);
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
