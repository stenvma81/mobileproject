import { useState } from 'react';
import PropTypes from 'prop-types';

export function MessageListItem({ message }) {
  return (
    <div className="message-item">
      <p>{message.user}</p>
      <div id="message-text">
        <p>{message.text}</p>
      </div>
    </div>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
};
