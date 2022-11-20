import { useEffect, useState } from 'react';
import { useMessage } from '../../hooks/MessageHooks';
import { MessageListItem } from './MessageListItem';

export function MessageList() {
  const { messageArray } = useMessage();

  useEffect(() => {}, []);

  return (
    <div id="message-list">
      <ul>
        {messageArray.map((message) => (
          <MessageListItem message={message} />
        ))}
      </ul>
    </div>
  );
}