import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModifieMessageField } from './ModifieMessageField';
import { FaPen } from 'react-icons/fa';
import { useMessage } from '../../hooks/MessageHooks';

export function MessageListItem({ message }) {
  const [isModifying, setIsModifying] = useState(false);
  const { addToViewedMessages } = useMessage(message.postid);

  const userCanModify = () => {
    const user = JSON.parse(sessionStorage.getItem('token')).user;
    return user.id === message.userid || user.role === 1;
  };

  useEffect(() => {
    addToViewedMessages(message.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="message-item">
      <p>{message.user}</p>
      <div id="message-text">
        {isModifying ? (
          <ModifieMessageField
            message={message}
            setIsModifying={setIsModifying}
          />
        ) : (
          <p>{message.text}</p>
        )}
        {userCanModify && (
          <FaPen className="modify-pen" onClick={() => setIsModifying(true)} />
        )}
      </div>
    </div>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
};
