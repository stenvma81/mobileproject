import React, { useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';
import classes from './smallCard.css';

export default function Card({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card">
      <div className="post-state">
        <div className="argumenpoststate">{`State: ${post.state}`}</div>
        <div className="card-date">
          <Moment date={post.created_date} format="DD.MM.YYYY HH:mm" />
        </div>
      </div>
      <div className="post-text">
        <div className="card-title">{post.title}</div>
        {isOpen && <div className="card-text">{post.description}</div>}
      </div>
      {isOpen && (
        <div>
          <div className="post-place">
            <div className="place">{`Location: ${post.location}`}</div>
          </div>
          <div className="post-modify">
            <button id="modify-button">Muokkaa ilmoitusta</button>
          </div>
          <SendMessage postid={post.id} />
          <MessageList postid={post.id} />
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.object,
};
