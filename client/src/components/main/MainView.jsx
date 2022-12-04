import { useEffect, useState } from 'react';
import React from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import { PostForm } from '../posts/PostForm';
import { PostList } from '../posts/PostList';
import './styles.css';


export function MainView() {
  useEffect(() => {}, []);
 const [FormIsOpen, setIsOpen] = useState(false);
  const { usersPost } = usePosts();
  
  const handleOpenForm = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget && FormIsOpen) {
      setIsOpen(!FormIsOpen);
    }
    !FormIsOpen && setIsOpen(!FormIsOpen);
  };
  

  return (
    <div id="container">
      <div className='buttons_container'>
        <div className='button1'>
          <button onClick={handleOpenForm}>Service Advice</button>
        </div>
        <div className='button2'>
          <button onClick={handleOpenForm}>Feedback</button>
      </div>
          <div className='button3'>
      <button onClick={handleOpenForm}>Development Proposal</button>
      </div>
      <div className='button4'>
      <button onClick={handleOpenForm}>Question</button>
      </div>
      </div>
      {FormIsOpen && (
        <PostForm/>)
      }
      <h3>Previous posts:</h3>
      <PostList postArray={usersPost} />
    </div>
  );
}

