import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';
import logo from '../header/images/nokia.jpg';
import MapModal from '../map-modal/MapModal';
import classes from './smallCard.css';
import { ModifyPostState } from '../admin/ModifyPostState';
import { FaTimes, FaPen } from 'react-icons/fa';
import { useMessage } from '../../hooks/MessageHooks';

export default function Card({ post }) {
  const { getViewedMessages, messageArray } = useMessage(post.id);
  const [newMessages, setNewMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);

  function openModal() {
    console.log(post);
    const marker = JSON.parse(post.areamarker);
    setMarkers([...markers.splice(0, marker), marker]);
    setShowModal(!showModal);
  }

  const TypeDot = () => {
    let color = 'red';
    post.typeid === 1 && (color = 'rgba(0,135,255,1)');
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

  useEffect(() => {
    const fetchViewedMessages = async () => {
      const msg = await getViewedMessages(post.id);
      msg && setNewMessages(msg);
    };
    const userInfo = JSON.parse(sessionStorage.getItem('token'));
    setIsAdmin(userInfo.user.role === 1);

    fetchViewedMessages();
  }, []);

  return (
    <div className="card" onClick={!isOpen ? handleParentClick : undefined}>
      {isOpen && <FaTimes onClick={() => setIsOpen(false)} />}
      <div className="post-state">
        <div className="post-type">
          <TypeDot />
          <div>{post.type}</div>
          <p>{messageArray.length - newMessages.length}</p>
        </div>
        <div id="card-date">
          <Moment date={post.created_date} format="DD.MM.YYYY HH:mm" />
          {post.closed_date !== null && (
            <Moment date={post.closed_date} format="DD.MM.YYYY HH:mm" />
          )}
        </div>
      </div>
      <div className="post-text">
        <div className="card-title">{post.title}</div>
        {isOpen && <div className="card-text">{post.description}</div>}
      </div>
      {isOpen && (
        <div>
          <div className="place">{`Location: ${post.location}`}</div>
          <div className="post-buttons">
            <div>
              <button onClick={openModal}>Show location</button>
            </div>
            <MapModal
              toggle={showModal}
              action={openModal}
              markers={markers}
              setMarkers={setMarkers}
            />
            <div className="post-modify">
              <button id="modify-button">
                Modify <FaPen id="pen-icon" />{' '}
              </button>
            </div>
          </div>
          {isAdmin && <ModifyPostState post={post} />}
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
