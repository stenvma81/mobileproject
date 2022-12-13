import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { MainContext } from '../../context/MainContext';
import { usePosts } from '../../hooks/ApiHooks';
import { PostList } from '../posts/PostList';

export function PostsByState({ poststate }) {
  const { loadPostByState } = usePosts();
  const { update } = useContext(MainContext);
  const [postArray, setPostArray] = useState([]);

  const fetchPosts = async () => {
    const posts = await loadPostByState(poststate.id);
    setPostArray(posts);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, poststate]);

  return (
    <div id="posts-by-state">
      <p>{`${poststate.title} (${postArray.length})`}</p>
      <PostList postArray={postArray} />
    </div>
  );
}
