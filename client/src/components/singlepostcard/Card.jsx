import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';
import logo from '../header/images/nokia.jpg';
import MapModal from '../map-modal/MapModal';
import './smallCard.css';
import { ModifyPostState } from '../admin/ModifyPostState';
import { MdClose } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { NewMessagesCount } from './NewMessagesCount';
import { MainContext } from '../../context/MainContext';
import { userRoles } from '../../utils/variables';
import { ModifyPost } from '../posts/ModifyPost';

export default function Card({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const { user } = useContext(MainContext);

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
    return <div className="dot" style={{ backgroundColor: color }} />;
  };

  const handleParentClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget && isOpen) {
      setIsOpen(!isOpen);
    }
    !isOpen && setIsOpen(!isOpen);
  };

  if (isModifying) {
    return <ModifyPost post={post} setIsModifying={setIsModifying} />;
  }

  return (
    <div className="card" onClick={!isOpen ? handleParentClick : undefined}>
      {isOpen && (
        <MdClose className="close-x" onClick={() => setIsOpen(false)} />
      )}
      <div className="post-state">
        <div className="column">
          <NewMessagesCount post={post} />
          <div className="post-type">
            <TypeDot />
            <div>{post.type}</div>
            {/* <NewMessagesCount post={post} /> */}
          </div>
        </div>

        <div className="column">
          <Moment date={post.created_date} format="DD.MM.YYYY HH:mm" />
          {post.closed_date !== null && (
            <Moment date={post.closed_date} format="DD.MM.YYYY HH:mm" />
          )}
          {post.state}
        </div>
      </div>
      <div className="post-text">
        <div className="card-title">{post.title}</div>
        {isOpen && (
          <div className="card-text">{`Location: ${post.location}`}</div>
        )}
      </div>
      {isOpen && (
        <div>
          <div className="place">{`${post.description}`}</div>
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
            <div className="post-modify" onClick={() => setIsModifying(true)}>
              <button id="modify-button">
                Modify <FaPen id="pen-icon" />
              </button>
            </div>
          </div>
          {user.role === userRoles.admin.id && <ModifyPostState post={post} />}
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
