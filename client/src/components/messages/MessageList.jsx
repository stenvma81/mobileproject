import { useEffect, useState } from 'react';
import { useMessage } from '../../hooks/MessageHooks';
import { MessageListItem } from './MessageListItem';

export function MessageList() {
  const { messageArray } = useMessage();

  useEffect(() => {}, []);

  return (
    <div id="message-list">
      <h1>Message List</h1>
      <p>{messageArray.length}</p>
      <ul>
        {messageArray.map((message) => (
          <MessageListItem message={message} />
        ))}
      </ul>
    </div>
  );
}
