import React from 'react';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks'
import MapModal from '../map-modal/MapModal';

export function PostForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [posttype, setPosttype] = useState('');
    const { uploadPost } = usePosts();
    const [showModal, setShowModal] = useState(false);
    const [markers, setMarkers] = useState([]);

    function openModal() {
        setShowModal(!showModal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(sessionStorage.getItem('token'));
        const msg = { userid: userInfo.user.id, type: 1, title: title, description: description, location: location, areamarker: "{top: 10, left: 50,}" };
        console.log(msg)
        await uploadPost(msg);
        setDescription('');
        setTitle('');
        setLocation('');
      };

    return (
    <>
        <div className="form-container">
            <form>
             <label htmlFor="title">Title</label>
             <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <div>
            <MapModal toggle={showModal} action={openModal} areamarker="" markers={markers} setMarkers={setMarkers}/>
            <input type="button" name="cardbutton" id="cardbutton" value="Choose on map" onClick={openModal}/>
            </div>
            <label htmlFor="posttype">Post type</label>

            <select name="posttype" id="posttype-select" value={posttype} onChange={(e) => setPosttype(e.target.value)}>
            <option value="">Please choose the type</option>
            <option value="service advice">Service Advice</option>
            <option value="safety advice">Safety Advice</option>
            <option value="feedback">Feedback</option>
            </select>
            <div>
            <input type="button" name="photobutton" id="photobutton" value="Add a photo" />
            </div>
            <button type="send" name="send" id="send" onClick={handleSubmit}>Send</button>
            </form>
        </div>
    </>
    );
}