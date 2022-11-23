import { useEffect } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import { PostForm } from '../posts/PostForm';
import { PostList } from '../posts/PostList';
import './styles.css';

export function MainView() {
  useEffect(() => {}, []);
  const { usersPost } = usePosts();

  return (
    <div id="container">
      <PostForm />
      <PostList postArray={usersPost} />
    </div>
  );
}
