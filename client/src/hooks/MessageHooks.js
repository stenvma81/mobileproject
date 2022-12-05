import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { doFetch } from '../utils/http';
import { messageUrl } from '../utils/variables';

const useMessage = (postid) => {
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const { update, user } = useContext(MainContext);

  useEffect(() => {
    // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
    (async () => {
      try {
        const messages = await loadMessagesByPostId(postid);
        // allMedia.reverse();
        if (messages === undefined) return;
        setMessageArray(messages);
      } catch (e) {
        console.log('usePosts useEffect error', e.message);
      }
    })();
  }, [postid, update]);

  const uploadMessage = async (formData) => {
    try {
      console.log('we get here');
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      console.log('ApiHooks: uploadMessage ', options.body);
      const result = await doFetch(messageUrl, options);
      return result;
    } catch (e) {
      console.log('uploadMessage error', e);
      throw new Error(e.message);
    }
  };

  const loadMessagesByPostId = async (id) => {
    try {
      const messageData = await doFetch(messageUrl + 'post/' + id);
      return messageData;
    } catch (e) {
      console.log('MessageHooks loadMessageById: ', e.message);
      return [];
    }
  };

  const modifyMessage = async (message) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      };
      const result = await doFetch(messageUrl + message.id, options);
      return result;
    } catch (error) {
      console.error('modifyMessage', error);
    }
  };

  const closeMessage = async (id) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
      };
      const result = await doFetch(messageUrl + 'close/' + id, options);
      return result;
    } catch (e) {
      console.log('closeMessage error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getViewedMessages = async (postid) => {
    try {
      const userid = user.id;
      const result = await doFetch(`${messageUrl}viewed/${postid}/${userid}`);
      return result;
    } catch (e) {
      console.log('getViewedMessages error', e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addToViewedMessages = async (messageid) => {
    try {
      const userid = user.id;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: userid }),
      };
      const result = await doFetch(messageUrl + messageid, options);
      return result;
    } catch (e) {
      console.log('addToViewedMessages error', e);
    }
  };

  return {
    loadMessagesByPostId,
    uploadMessage,
    closeMessage,
    modifyMessage,
    messageArray,
    getViewedMessages,
    addToViewedMessages,
  };
};

export { useMessage };
