import React from 'react';
// import axios from 'axios';
import './styles.css';
import { useState } from 'react';

export function PostFormComponent() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [posttype, setPosttype] = useState('');


    return (
    <>
        <div className="container">
             <label htmlFor="title">Title</label>
             <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="button" name="cardbutton" id="cardbutton" value="Choose on map" />

            <label htmlFor="posttype">Post type</label>

            <select name="posttype" id="posttype-select" value={posttype} onChange={(e) => setPosttype(e.target.value)}>
            <option value="">Please choose the type</option>
            <option value="service advice">Service Advice</option>
            <option value="safety advice">Safety Advice</option>
            <option value="feedback">Feedback</option>
            </select>

            <input type="button" name="photobutton" id="photobutton" value="Add a photo" />
    
            <input type="button" name="send" id="send" value="SEND" onClick={console.log("CLICKED!!")} />
        </div>
    </>
    );
}


