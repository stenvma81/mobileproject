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
            <h1>Create a post</h1>
        <select name="posttype" id="posttype-select" value={posttype} onChange={(e) => setPosttype(e.target.value)}>
            <option value="">Please choose the post type</option>
            <option value="service advice">Service Advice</option>
            <option value="safety advice">Safety Advice</option>
            <option value="feedback">Feedback</option>
            </select>
             <input type="text" name="title" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            
            <input type="text" name="description" id="description" placeholder="Descpription" value={description} onChange={(e) => setDescription(e.target.value)} />

            <input type="text" name="location" id="location" placeholder="Location"  value={location} onChange={(e) => setLocation(e.target.value)} />
            <div id="buttons">
            <input type="button" name="cardbutton" id="cardbutton" value="Choose on map" />
            <input type="button" name="photobutton" id="photobutton" value="Add a photo" />
            </div>
            <div id="send-button">
            <input type="button" name="send" id="send" value="SEND" onClick={console.log("CLICKED!!")} />
            </div>
        </div>
    </>
    );
}


