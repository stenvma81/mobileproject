import React from 'react';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';

export default function Postlistcard({ post }) {
  return (
    <div>
        <div>{post.title}</div>
        <div>{post.created_date}</div>
    </div>
  );
}

 Postlistcard.propTypes = {
  post: PropTypes.object,
}; 
