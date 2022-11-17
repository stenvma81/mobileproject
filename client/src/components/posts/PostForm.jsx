import React from 'react';
// import axios from 'axios';
import './styles.css';
import { useState } from 'react';
import { usePosts } from '../../hooks/ApiHooks'

export function PostForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [posttype, setPosttype] = useState('');
    const { uploadPost } = usePosts();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(sessionStorage.getItem('token'));
        const msg = { userid: userInfo.user.id, type: 1, title: title, description: description, location: location };
        console.log(msg)
        await uploadPost(msg);
        setDescription('');
        setTitle('');
        setLocation('');
      };

    return (
    <>
        <div className="container">
            <form onSubmit={handleSubmit}>
             <label htmlFor="title">Title</label>
             <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <div>
            <input type="button" name="cardbutton" id="cardbutton" value="Choose on map" />
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
            <button type="send" name="send" id="send">Send</button>
            </form>
        </div>
    </>
    );
}