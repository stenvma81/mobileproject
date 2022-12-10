/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from 'react';
import React from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import { PostForm } from '../posts/PostForm';
import { PostList } from '../posts/PostList';
import './styles.css';
import { postTypes } from '../../utils/variables';

export function MainView() {
  useEffect(() => {}, []);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [postType, setPostType] = useState();
  const { usersPost } = usePosts();

  const handleOpenForm = (event, postType) => {
    event.preventDefault();
    setPostType(postType);
    setFormIsOpen(!formIsOpen);
  };

  const FormButtons = () => {
    return (
      <div className="buttons_container">
        <div className="button1">
          <button className='mainViewButton' onClick={(e) => handleOpenForm(e, postTypes.serviceAdvice)}>
            Service Advice
          </button>
        </div>
        <div className="button2">
          <button className='mainViewButton'  onClick={(e) => handleOpenForm(e, postTypes.feedback)}>
            Feedback
          </button>
        </div>
        <div className="button3">
          <button className='mainViewButton'  onClick={(e) => handleOpenForm(e, postTypes.safetyAdvice)}>
            Safety Advice
          </button>
        </div>
        {/* <div className="button4">
      <button onClick={handleOpenForm}>Question</button>
    </div> */}
      </div>
    );
  };

  return (
    <div id="container">
      {formIsOpen ? (
        <PostForm setFormIsOpen={setFormIsOpen} postType={postType} />
      ) : (
        <FormButtons />
      )}
      <h3>Previous posts:</h3>
      <PostList postArray={usersPost} />
    </div>
  );
}
