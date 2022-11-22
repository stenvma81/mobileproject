import { useEffect } from 'react';
import { PostForm } from '../posts/PostForm';
import { PostList } from '../posts/PostList';
import './styles.css';

export function MainView() {
  useEffect(() => {}, []);

  return (
    <div id="container">
      <PostForm />
      <PostList />
    </div>
  );
}
