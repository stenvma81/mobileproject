import { useEffect } from 'react';
import { usePosts } from '../../hooks/ApiHooks'; 
import Postlistcard from './postlist-card';

export function PostListaddmin() {
  const { postArray } = usePosts();

  useEffect(() => {}, []);

  return (
    <div id="post-list">
      <p></p>
      <ul>
        {postArray.map((post) => (
          <Postlistcard post={post} />
        ))}
      </ul>
    </div>
  );
}