import { useEffect } from 'react';
import Card from '../singlepostcard/Card';
import PropTypes from 'prop-types';

export function PostList({ postArray }) {
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

PostList.propTypes = {
  postArray: PropTypes.array.isRequired,
};
