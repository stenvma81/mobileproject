import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { MessageList } from '../messages/MessageList';
import { SendMessage } from '../messages/SendMessage';
import PropTypes from 'prop-types';
import logo from '../header/images/nokia.jpg';
import MapModal from '../map-modal/MapModal';
import { ImageModal } from '../image-modal/ImageModal';
import './smallCard.css';
import { ModifyPostState } from '../admin/ModifyPostState';
import { MdClose, MdCreate, MdSocialDistance } from 'react-icons/md';
import { FaPen, FaStarOfLife } from 'react-icons/fa';
import { NewMessagesCount } from './NewMessagesCount';
import { MainContext } from '../../context/MainContext';
import { userRoles, imageUrl } from '../../utils/variables';
import { ModifyPost } from '../posts/ModifyPost';

export default function Card({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const { user } = useContext(MainContext);

  const openModal = () => {
    const marker = JSON.parse(post.areamarker);
    setMarkers([...markers.splice(0, marker), marker]);
    setShowModal(!showModal);
  };

  const openImage = () => {
    setShowImageModal(!showImageModal);
  };

  const TypeDot = () => {
    let color = 'rgba(6,177,169,1)';
    post.typeid === 1 && (color = 'rgba(135,110,255,1)');
    post.typeid === 3 && (color = 'rgba(246,13,13,1)');
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
      <div className="form-title">
        <NewMessagesCount post={post} />
        {isOpen && (
          <div className="close-modify">
            <MdCreate
              className="close-x"
              onClick={() => setIsModifying(true)}
            />
            <MdClose className="close-x" onClick={() => setIsOpen(false)} />
          </div>
        )}
      </div>
      <div className="post-state">
        <div className="column">
          <div className="post-type">
            <div>
              <TypeDot className="dot-border" />
              {post.type}
            </div>
            <div style={{ 'padding-top': '5px' }}>{post.state}</div>
            {/* <NewMessagesCount post={post} /> */}
          </div>
        </div>

        <div className="column">
          <Moment date={post.created_date} format="DD.MM.YYYY HH:mm" />
          {post.closed_date !== null && (
            <Moment date={post.closed_date} format="DD.MM.YYYY HH:mm" />
          )}
        </div>
      </div>
      <div className="post-text">
        <div className="card-title">{post.title}</div>
        {isOpen && <div className="place">{`${post.description}`}</div>}
      </div>
      {isOpen && (
        <div>
          <div className="card-text">{`Location: ${post.location}`}</div>
          <div className="post-buttons">
            <div>
              <button onClick={openModal}>Show location</button>
            </div>
            <div>
              <button onClick={openImage}>Show image</button>
            </div>
            <MapModal
              toggle={showModal}
              action={openModal}
              markers={markers}
              setMarkers={setMarkers}
            />
            <ImageModal
              toggle={showImageModal}
              action={openImage}
              url={imageUrl + post.mediafilename}
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
