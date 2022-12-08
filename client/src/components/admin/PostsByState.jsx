import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { MainContext } from '../../context/MainContext';
import { usePosts } from '../../hooks/ApiHooks';
import { PostList } from '../posts/PostList';

export function PostsByState({ poststate }) {
  const { loadPostByState } = usePosts();
  const { update } = useContext(MainContext);
  const [postArray, setPostArray] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await loadPostByState(poststate.id);
      if (posts === undefined) {
        return;
      }
      posts && setPostArray(posts);
    };
    fetchPosts();
  }, [update]);

  return (
    <div id="posts-by-state">
      <p>{`${poststate.title} (${postArray.length})`}</p>
      <PostList postArray={postArray} />
    </div>
  );
}
