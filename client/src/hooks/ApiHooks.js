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
    
        const callServer = async () => {
            console.log("Token: ", sessionStorage.getItem('token'));
            axios.get(testUrl, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              },
              params: {
                table: 'sample',
              },
            }).then((response) => {
              console.log(response.data);
            });
          }

    return {
        loadPosts, callServer
      };
}

export {usePosts};