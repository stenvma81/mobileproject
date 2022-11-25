import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMessage } from '../../hooks/MessageHooks';
import { MessageListItem } from './MessageListItem';

export function MessageList({ postid }) {
  const { messageArray } = useMessage(postid);

  useEffect(() => {}, []);

  return (
    <div id="message-list">
      <ul>
        {messageArray.map((message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
}

MessageList.propTypes = {
  postid: PropTypes.number.isRequired,
};
