import React, { useContext } from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import MapModal from '../map-modal/MapModal';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { postTypes } from '../../utils/variables';
import { MainContext } from '../../context/MainContext';

export function ModifyPost({ post, setIsModifying }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [location, setLocation] = useState(post.location);
  const [postType, setPostType] = useState(post.typeid);

  const { update, setUpdate } = useContext(MainContext);

  const { modifyPost } = usePosts();
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);

  function openModal() {
    // const marker = JSON.parse(post.areamarker);
    // setMarkers([...markers.splice(0, marker), marker]);
    setShowModal(!showModal);
  }

  const TypeRadioButton = ({ type }) => (
    <label>
      <input
        type="radio"
        value={`${type.id}`}
        onChange={() => setPostType(type.id)}
        checked={postType === type.id}
      />
      {type.title}
    </label>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      location: location,
      areamarker: JSON.stringify(markers[0]),
      type: postType,
    };
    console.log(data);
    const response = await modifyPost(data, post.id);
    if (response) {
      alert('Post has been modified');
      setIsModifying(false);
      setUpdate(update + 1);
    }
  };

  useEffect(() => {
    if (markers.length === 0) {
      const marker = JSON.parse(post.areamarker);
      setMarkers([...markers.splice(0, marker), marker]);
    }
  }, [post.areamarker]);

  return (
    <div className="form-container">
      <form>
        <div className="form-title">
          <h1>Modify</h1>
          <MdClose
            onClick={() => {
              setIsModifying(false);
            }}
          />
        </div>
        <div className="column">
          <TypeRadioButton type={postTypes.serviceAdvice} />
          <TypeRadioButton type={postTypes.feedback} />
          <TypeRadioButton type={postTypes.safetyAdvice} />
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
        <div className="column">
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
              type="button"
              name="photobutton"
              id="photobutton"
              value="Add a photo"
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

ModifyPost.propTypes = {
  post: PropTypes.object.isRequired,
  setIsModifying: PropTypes.func.isRequired,
};
