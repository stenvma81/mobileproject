import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModifyMessageField } from './ModifyMessageField';
import {MdCreate} from 'react-icons/md';
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
      <div style={{'display':'flex' , 'justify-content': 'space-between'}}>
      <p className="no-margin">{message.user}</p>
      <Moment date={message.closed_date} format="DD.MM.YYYY HH:mm" />
      </div>
      <div id="message-content" className="column">
        {isModifying ? (
          <ModifyMessageField
            message={message}
            setIsModifying={setIsModifying}
          />
        ) : (
          <div id="message-div" className="flex">
            <p id="message-text" className="no-margin">
              {message.text}
            </p>
            {user.id === message.userid && (
              <MdCreate
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
