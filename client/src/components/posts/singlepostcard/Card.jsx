import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import MapModal from '../../map-modal/MapModal';
import { ImageModal } from '../../image-modal/ImageModal';
import './smallCard.css';
import { ModifyPostState } from '../../admin/ModifyPostState';
import { MdClose, MdCreate } from 'react-icons/md';
import { NewMessagesCount } from './NewMessagesCount';
import { MainContext } from '../../../context/MainContext';
import { userRoles, imageUrl, postTypes } from '../../../utils/variables';
import { ModifyPost } from '../ModifyPost';
import { SendMessage } from '../messages/SendMessage';
import { MessageList } from '../messages/MessageList';

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
    if (showImageModal === true) setShowImageModal(false);
    setShowModal(!showModal);
  };

  const openImage = () => {
    if (showModal === true) setShowModal(false);
    setShowImageModal(!showImageModal);
  };

  const TypeDot = () => {
    let color = 'rgba(6,177,169,1)';
    post.typeid === postTypes.feedback.id && (color = 'rgba(135,110,255,1)');
    post.typeid === postTypes.safetyAdvice.id && (color = 'rgba(246,13,13,1)');
    return <div className="dot" style={{ backgroundColor: color }} />;
  };

  const openCard = (event) => {
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
    <div className="card" onClick={!isOpen ? openCard : undefined}>
      <div className="post-state">
        <div className="column">
          <div className="post-type">
            <div id="post-type-text">
              <TypeDot className="dot-border" />
              {post.type}
            </div>
            <div style={{ 'padding-top': '10px' }}>{post.state}</div>
            {/* <NewMessagesCount post={post} /> */}
          </div>
        </div>

        <div className="column">
          <div className="form-title">
            <NewMessagesCount post={post} />
            {isOpen && (
              <div className="close-modify">
                <MdCreate
                  className="icon-pen"
                  onClick={() => setIsModifying(true)}
                />
                <MdClose className="close-x" onClick={() => setIsOpen(false)} />
              </div>
            )}
          </div>
          <div id="time" className="column">
            <Moment date={post.created_date} format="DD.MM.YYYY HH:mm" />
            {post.closed_date !== null && (
              <Moment date={post.closed_date} format="DD.MM.YYYY HH:mm" />
            )}
          </div>
        </div>
      </div>
      <div className="post-text">
        <div className="card-title">{post.title}</div>
        {isOpen && (
          <div className="place">
            <p
              id="description-text"
              className="no-margin"
            >{`${post.description}`}</p>
          </div>
        )}
      </div>
      {isOpen && (
        <div>
          <div className="card-text">{`Location: ${post.location}`}</div>
          <div className="post-buttons">
            {post.areamarker !== '{}' && (
              <div>
                <button onClick={openModal}>Show location</button>
              </div>
            )}
            {post.mediafilename !== null && (
              <div>
                <button onClick={openImage}>Show image</button>
              </div>
            )}
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
