<<<<<<< HEAD
import React from "react";
import "./styles.css";
import { useState } from "react";
import { usePosts } from "../../hooks/ApiHooks";
import MapModal from "../map-modal/MapModal";
import { MdClose } from "react-icons/md";

export function PostForm({ setFormIsOpen }) {
  const [title, setTitle] = useState("");
=======
import React from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import MapModal from '../map-modal/MapModal';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

export function PostForm({ postType, setFormIsOpen }) {
  const [title, setTitle] = useState('');
>>>>>>> 2c546f6ce6111be9b01346e077c27e25e71c6483
  // const [FormIsOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { uploadPost } = usePosts();
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);

  function openModal() {
    setShowModal(!showModal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem("token"));
    const msg = {
      userid: userInfo.user.id,
      type: postType.id,
      title: title,
      description: description,
      location: location,
      areamarker: JSON.stringify(markers[0]),
    };
    console.log(msg);
    await uploadPost(msg);
    setDescription("");
    setTitle("");
    setLocation("");
    alert("Post has been submitted");
  };

  return (
    <>
      <div className='form-container'>
        <form>
<<<<<<< HEAD
          <div className='form-title'>
          <h1>Create a post</h1>
            <MdClose
              onClick={() => {
                setFormIsOpen(false);
              }}
            />
          </div>
=======
          <MdClose
            onClick={() => {
              setFormIsOpen(false);
            }}
          />

          <h1>{postType.title}</h1>
>>>>>>> 2c546f6ce6111be9b01346e077c27e25e71c6483
          {/* <select
            name="posttype"
            id="posttype-select"
            value={posttype}
            onChange={(e) => setPosttype(e.target.value)}
            >
            <option value="">Please choose the type</option>
            <option value="service advice">Service Advice</option>
            <option value="feedback">Feedback</option>
            <option value="development proposal">Development Proposal</option>
            <option value="question">Question</option>
          </select> */}
          <textarea
            placeholder='Title'
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder='Description'
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            placeholder='Location'
            type='text'
            name='location'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div>
            <MapModal
              toggle={showModal}
              action={openModal}
              areamarker=''
              markers={markers}
              setMarkers={setMarkers}
            />
            <input
              type='button'
              name='cardbutton'
              id='cardbutton'
              value='Choose on map'
              onClick={openModal}
            />
          </div>

          <div>
            <input
              type='button'
              name='photobutton'
              id='photobutton'
              value='Add a photo'
            />
          </div>
          <input
            type='button'
            name='sendbutton'
            id='sendbutton'
            value='Send'
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
}

PostForm.propTypes = {
  postType: PropTypes.object.isRequired,
  setFormIsOpen: PropTypes.func.isRequired,
};
