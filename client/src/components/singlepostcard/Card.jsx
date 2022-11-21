import React from 'react';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';
import classes from './smallCard.css';

export default function Card({ post }) {
  return (
    <div className="card">
      <div className="post-state">
        <div className="argumenpoststate">{`State: ${post.state}`}</div>
        <div className="card-date">{post.created_date}</div>
      </div>
      <div className="post-text">
        <div className="card-title">{post.title}</div>
        <div className="card-text">{post.description}</div>
      </div>
      <div className="post-place">
        {/* <div className="argumentplace">{props.argumentplace}</div> */}
        <div className="place">{`Location: ${post.location}`}</div>
      </div>
      <div className="post-modify">
        <button id="modify-button">Muokkaa ilmoitusta</button>
      </div>
      {/* <div className="post-message">
        <div className="argumentmessage">{props.argumentmessage}</div>
        <button id="send-button">Lähetä</button>
      </div> */}
      <SendMessage postid={post.id} />
      <MessageList postid={post.id} />
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.object,
};
