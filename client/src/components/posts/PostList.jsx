import { useEffect } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import Card from '../singlepostcard/Card';

export function PostList() {
  const { postArray } = usePosts();

  useEffect(() => {}, []);

  return (
    <div id="post-list">
      <p></p>
      <ul>
        {postArray.map((post) => (
          <Card post={post} />
        ))}
      </ul>
    </div>
  );
}
