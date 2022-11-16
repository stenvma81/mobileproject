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
          console.log('uploadMedia error', e);
          throw new Error(e.message);
        } finally {
          setLoading(false);
        }
/*
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "phpMyAdmin=2276f89b9efaf0f7899da4d66f31b1c6; pma_lang=en");

        var urlencoded = new URLSearchParams();
        urlencoded.append("userid", "1");
        urlencoded.append("description", "kakakaka");
        urlencoded.append("type", "1");
        urlencoded.append("title", "hihihi");
        urlencoded.append("location", "hohohoho");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
};

fetch("http://localhost:8000/post", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  */
      };

    return {
        loadPosts,
        loadSinglePost,
        uploadPost
      };
}

export {usePosts};