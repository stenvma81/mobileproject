import { useEffect } from 'react';
import Card from '../singlepostcard/Card';

export function PostList({ postArray }) {
  // const { postArray } = usePosts();

  useEffect(() => {}, []);

  return (
    <div id="post-list">
      <ul>
        {postArray.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
