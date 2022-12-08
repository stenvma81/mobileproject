import React from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import MapModal from '../map-modal/MapModal';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

export function PostForm({ postType, setFormIsOpen }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [FormIsOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { uploadPost } = usePosts();
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);

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
    /*
    const msg = {
      userid: userInfo.user.id,
      type: postType.id,
      title: title,
      description: description,
      location: location,
      areamarker: JSON.stringify(markers[0]),
      media: image.data,
    };
    */
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]); 
  }
    await uploadPost(formData);
    setDescription('');
    setTitle('');
    setLocation('');
    setMarkers([]);
    setImage(null);
    setIsOpen(!FormIsOpen);
    alert('Post has been submitted');
  };

  const handleOpenForm = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget && FormIsOpen) {
      setIsOpen(!FormIsOpen);
    }
  };

  const handleFileChange = (e) => {
    const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
    }
    setImage(e.target.files[0]);
  }

  return (
    <div className="form-container">
      <form>
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
        />

        <textarea
          placeholder="Description"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Location"
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="two-icons-message">
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
          <div>
          <input 
            type="file" 
            name="media" 
            accept='image/*' 
            multiple={false} 
            onChange={handleFileChange}
          />
          </div>
        </div>
        <input
          type="button"
          name="sendbutton"
          id="sendbutton"
          value="Send"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

PostForm.propTypes = {
  postType: PropTypes.object.isRequired,
  setFormIsOpen: PropTypes.func.isRequired,
};
