import React, { useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';
import classes from './smallCard.css';

export default function Card({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const TypeDot = () => {
    let color = 'red';
    post.typeid === 1 && (color = 'blue');
    post.typeid === 3 && (color = 'yellow');
    return <div className="dot" style={{ backgroundColor: color }}></div>;
  };
  const handleParentClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget && isOpen) {
      setIsOpen(!isOpen);
    }
    !isOpen && setIsOpen(!isOpen);
  };
  return (
    <div className="card" onClick={!isOpen ? handleParentClick : undefined}>
      {isOpen && <button onClick={() => setIsOpen(false)}>Close</button>}
      <div className="post-state">
        <div className="post-type">
          <TypeDot />
          <div>{post.type}</div>
        </div>
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
