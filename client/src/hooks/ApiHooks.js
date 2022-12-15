import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { doFetch } from '../utils/http';
import { postUrl } from '../utils/variables';

const usePosts = () => {
  const [postArray, setPostArray] = useState([]);
  const [usersPost, setUsersPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { update } = useContext(MainContext);

  useEffect(() => {
    // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
    (async () => {
      try {
        const allPosts = await loadPosts();
        const userPosts = await loadPostByUserId();
        setUsersPost(userPosts);
        // allMedia.reverse();
        setPostArray(allPosts);
      } catch (e) {
        console.log('usePosts useEffect error', e.message);
      }
    })();
  }, [update]);

  const loadPosts = async () => {
    try {
      const postData = await doFetch(postUrl);
      console.log('Apihooks loadPosts: success', postData);
      return postData;
    } catch (e) {
      console.log('Apihooks loadPosts: ', e.message);
      return [];
    }
  };

  const loadSinglePost = async (id) => {
    try {
      const postData = await doFetch(postUrl + id);
      console.log('Apihooks loadSinglePost: success', postData);
      return postData;
    } catch (e) {
      console.log('ApiHooks: loadSinglePost: ', e.message);
      return {};
    }
  };

  const loadPostByUserId = async () => {
    try {
      const userdata = JSON.parse(sessionStorage.getItem('token'));
      const userid = userdata.user.id;
      const postData = await doFetch(postUrl + 'user/' + userid);
      console.log('Apihooks loadPostByUserId: success', postData);
      return postData;
    } catch (e) {
      console.log('ApiHooks: loadPostByUserId: ', e.message);
      return [];
    }
  };

  const loadPostByState = async (stateid) => {
    try {
      console.log('loadPostsByState: ', stateid);
      const postdata = await doFetch(postUrl + 'state/' + stateid);
      console.log('loadPostsByState: ', postdata);
      return postdata;
    } catch (error) {
      console.error('ApiHooks: loadPostByState: ', error.message);
      return [];
    }
  };

  const uploadPost = async (formData) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        body: formData,
      };
      const tester = options.body.get('media');
      console.log('uploadPost tester', tester);
      let url;
      if (tester === 'null') {
        console.log("namnam");
        url = postUrl;
      } else {
        console.log("hyhhyh");
        url = postUrl + 'withimage/';
      }
      const result = await doFetch(url, options);
      return result;
    } catch (e) {
      console.log('uploadPost error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadPost2 = async (formData) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        body: formData,
      };
      const result = await doFetch(postUrl, options);
      return result;
    } catch (e) {
      console.log('uploadMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const closePost = async (id) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
      };
      const result = await doFetch(postUrl + 'close/' + id, options);
      return result;
    } catch (e) {
      console.log('closePost error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyPostState = async (postid, stateid) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: stateid }),
      };
      console.log('ApiHooks: modifyPostState ', options.body);
      const result = await doFetch(`${postUrl}state/${postid}`, options);
      return result;
    } catch (e) {
      console.log('modifyPostState error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyPost = async (formData, id) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      console.log('ApiHooks: modifyPost ', options.body);
      const result = await doFetch(postUrl + id, options);
      return result;
    } catch (e) {
      console.log('modifyPost error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    postArray,
    loading,
    loadPosts,
    loadSinglePost,
    loadPostByState,
    uploadPost,
    closePost,
    modifyPostState,
    modifyPost,
    loadPostByUserId,
    usersPost,
    uploadPost2,
  };
};

export { usePosts };
