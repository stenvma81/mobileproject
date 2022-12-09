import React, { useContext, useRef } from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import MapModal from '../map-modal/MapModal';
import { MdClose, MdAddPhotoAlternate } from 'react-icons/md';
import PropTypes from 'prop-types';
import { MainContext } from '../../context/MainContext';

export function PostForm({ postType, setFormIsOpen }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { uploadPost } = usePosts();
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const { update, setUpdate } = useContext(MainContext);
  const inputFile = useRef(null);
  function openModal() {
    setShowModal(!showModal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem('token'));
    const formData = new FormData();
    formData.append('media', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('areamarker', JSON.stringify(markers[0]));
    formData.append('userid', userInfo.user.id);
    formData.append('type', 1);
    console.log('handleSubmit', image);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ' - ' + pair[1]);
    }

    const response = await uploadPost(formData);
    if (response) {
      afterSubmit();
      return;
    }
    alert('Failed to submit post');
  };

  const afterSubmit = () => {
    setDescription('');
    setTitle('');
    setLocation('');
    setMarkers([]);
    setImage(null);
    alert('Post has been submitted');
    setFormIsOpen(false);
    setUpdate(update + 1);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          <h1>{postType.title}</h1>
          <MdClose
            onClick={() => {
              setFormIsOpen(false);
            }}
          />
        </div>
        <textarea
          placeholder="Title"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength="1"
          maxLength="50"
        />

        <textarea
          placeholder="Description"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength="1"
          maxLength="250"
        />

        <textarea
          placeholder="Location"
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          minLength="1"
          maxLength="50"
        />
        {/*<div className="two-icons-message">*/}
          <div>
            <MapModal
              toggle={showModal}
              action={openModal}
              areamarker=""
              markers={markers}
              setMarkers={setMarkers}
            />
            <input
              type="button"
              name="cardbutton"
              id="cardbutton"
              value="Choose on map"
              onClick={openModal}
            />
          </div>
         {/* </div>*/}
          <div>
            <input id='UploadPhoto'
              type="file"
              name="media"
              accept="image/*"
              multiple={false}
              ref={inputFile} 
              onChange={handleFileChange}
            />
            <button id='AddPhotoButton'
              onClick={() => inputFile.current.click()}>Add Photo<MdAddPhotoAlternate id='photo-icon' /></button>
          </div>
        
        <button
          type="send"
          name="sendbutton"
          id="sendbutton"
          // value="Send"
          // onClick={handleSubmit}
        >
          Send
        </button>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  postType: PropTypes.object.isRequired,
  setFormIsOpen: PropTypes.func.isRequired,
};
