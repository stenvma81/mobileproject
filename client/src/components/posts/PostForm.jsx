<<<<<<< HEAD
import React from "react";
import "./styles.css";
import { useState } from "react";
import { usePosts } from "../../hooks/ApiHooks";
import MapModal from "../map-modal/MapModal";
import { FaTimes } from "react-icons/fa";

export function PostForm() {
  const [title, setTitle] = useState("");
  const [FormIsOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
=======
import React from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import MapModal from '../map-modal/MapModal';

export function PostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [posttype, setPosttype] = useState('');
>>>>>>> c2728f3e0576121794b6ebd14a4d3dc6511dc777
  const { uploadPost } = usePosts();
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);

  function openModal() {
    setShowModal(!showModal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem('token'));
    const msg = {
      userid: userInfo.user.id,
      type: 1,
      title: title,
      description: description,
      location: location,
      areamarker: JSON.stringify(markers[0]),
    };
    console.log(msg);
    await uploadPost(msg);
    setDescription('');
    setTitle('');
    setLocation('');
    alert('Post has been submitted');
  };

  const handleOpenForm = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget && FormIsOpen) {
      setIsOpen(!FormIsOpen);
    }
    !FormIsOpen && setIsOpen(!FormIsOpen);
  };

  return (
    <>
      <div className='form-container'>
        <form>
          <FaTimes onClick={handleOpenForm} />
          <h1>Create a post</h1>
<<<<<<< HEAD
          {/* <select
=======

          <select
>>>>>>> c2728f3e0576121794b6ebd14a4d3dc6511dc777
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
          <input
            placeholder='Title'
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder='Description'
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
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
