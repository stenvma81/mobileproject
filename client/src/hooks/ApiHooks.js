import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {doFetch} from '../utils/http';
import {baseUrl, postUrl, testUrl} from '../utils/variables';
import axios from 'axios';

const usePosts = () => {
    const [postArray, setPostArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const {update, user} = useContext(MainContext);

    useEffect(() => {
        // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
        (async () => {
          try {
            const allPosts = await loadPosts();
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
            return {};
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

    const uploadPost = async (formData) => {  
        try {
          setLoading(true);
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          };
          console.log("ApiHooks: uploadPost ", options.body)
          const result = await doFetch(postUrl, options);
          return result;
        } catch (e) {
          console.log('uploadPost error', e);
          throw new Error(e.message);
        } finally {
          setLoading(false);
        }
      };

      const closePost = async (id) => {  
        try {
          setLoading(true);
          const options = {
            method: 'PUT'
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

    return {
        loadPosts,
        loadSinglePost,
        uploadPost,
        closePost
      };
}

export {usePosts};