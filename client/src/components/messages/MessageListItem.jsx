import { useState } from 'react';

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
