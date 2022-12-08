import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModifieMessageField } from './ModifieMessageField';
import { FaPen } from 'react-icons/fa';
import { useMessage } from '../../hooks/MessageHooks';
import { MainContext } from '../../context/MainContext';
import Moment from 'react-moment';
import './messages.css';

export function MessageListItem({ message }) {
  const [isModifying, setIsModifying] = useState(false);
  const { addToViewedMessages } = useMessage(message.postid);
  const { user } = useContext(MainContext);

  useEffect(() => {
    addToViewedMessages(message.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="message-item">
      <p className="no-margin">{message.user}</p>
      <Moment date={message.closed_date} format="DD.MM.YYYY HH:mm" />
      <div id="message-content" className="column">
        {isModifying ? (
          <ModifieMessageField
            message={message}
            setIsModifying={setIsModifying}
          />
        ) : (
          <div id="message-div" className="flex">
            <p id="message-text" className="no-margin">
              {message.text}
            </p>
            {user.id === message.userid && (
              <FaPen
                className="modify-pen"
                onClick={() => setIsModifying(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
};
