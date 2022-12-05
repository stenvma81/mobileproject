import { useEffect, useState } from 'react';
import Card from '../singlepostcard/Card';
import PropTypes from 'prop-types';
import { useMessage } from '../../hooks/MessageHooks';

export function PostList({ postArray }) {
  const { getViewedMessages, loadMessagesByPostId } = useMessage();
  const [postsAndNewMessages, setPostsAndNewMessages] = useState([]);

  const getNewMessagesCount = async (postid) => {
    const viewedMessages = await getViewedMessages(postid);
    const allMessages = await loadMessagesByPostId(postid);
    return allMessages.length - viewedMessages.length;
  };

  const fetchPostsAndMessages = async () => {
    const postsWithNewMessages = await Promise.all(
      postArray.map(async (post) => ({
        post: post,
        newMessages: await getNewMessagesCount(post.id),
      }))
    );
    postsWithNewMessages.sort((a, b) => a.newMessages - b.newMessages);
    postsWithNewMessages.reverse();
    setPostsAndNewMessages(postsWithNewMessages);
  };

  useEffect(() => {
    fetchPostsAndMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postArray]);

  return (
    <div id="post-list">
      <ul>
        {postsAndNewMessages.map((item) => (
          <Card key={item.post.id} post={item.post} />
        ))}
      </ul>
    </div>
  );
}

PostList.propTypes = {
  postArray: PropTypes.array.isRequired,
};
