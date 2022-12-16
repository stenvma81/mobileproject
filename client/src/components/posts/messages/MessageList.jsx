import PropTypes from 'prop-types';
import { useMessage } from '../../../hooks/MessageHooks';
import { MessageListItem } from './MessageListItem';

export function MessageList({ postid }) {
  const { messageArray } = useMessage(postid);

  return (
    <ul>
      {messageArray.map((message) => (
        <MessageListItem key={message.id} message={message} />
      ))}
    </ul>
  );
}

MessageList.propTypes = {
  postid: PropTypes.number.isRequired,
};
