import React from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import MapModal from '../map-modal/MapModal';
import { FaTimes } from 'react-icons/fa';

export function PostForm() {
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
      type: 1,
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
    alert('Post has been submitted');
  };

  const handleOpenForm = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget && FormIsOpen) {
      setIsOpen(!FormIsOpen);
    }
    !FormIsOpen && setIsOpen(!FormIsOpen);
  };

  const handleFileChange = (e) => {
    const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
    }
    setImage(e.target.files[0]);
  }

  return (
    <>
      <div className="form-container">
        <form>
          <FaTimes onClick={handleOpenForm} />
          <h1>Create a post</h1>
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
          <input
            placeholder="Title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Location"
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
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
          <input type="file" name="media" accept='image/*' multiple={false} onChange={handleFileChange}/>
          <div>
            <input
              type="button"
              name="photobutton"
              id="photobutton"
              value="Add a photo"
            />
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
    </>
  );
}
