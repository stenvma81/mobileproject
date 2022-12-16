/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react';
import React from 'react';
import { usePosts } from '../../../hooks/ApiHooks';
import { PostForm } from '../../posts/PostForm';
import { PostList } from '../../posts/PostList';
import './styles.css';
import { postTypes } from '../../../utils/variables';

export function MainView() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [postType, setPostType] = useState();
  const { usersPost } = usePosts();

  const handleOpenForm = (event, postType) => {
    event.preventDefault();
    setPostType(postType);
    setFormIsOpen(!formIsOpen);
  };

  const FormButton = ({ type }) => (
    <button className="mainViewButton" onClick={(e) => handleOpenForm(e, type)}>
      {type.title}
    </button>
  );

  const FormButtons = () => (
    <div className="buttons_container">
      <div className="button1">
        <FormButton type={postTypes.serviceAdvice} />
      </div>
      <div className="button2">
        <FormButton type={postTypes.feedback} />
      </div>
      <div className="button3">
        <FormButton type={postTypes.safetyAdvice} />
      </div>
    </div>
  );

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
