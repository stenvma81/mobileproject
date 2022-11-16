import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {doFetch} from '../utils/http';
import {messageUrl} from '../utils/variables';

const useMessage = () => {
    const [messageArray, setMessageArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const {update, user} = useContext(MainContext);

    useEffect(() => {
        // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
        (async () => {
          try {
            const messages = await loadMessagesByPostId(1);
            // allMedia.reverse();
            setMessageArray(messages);
          } catch (e) {
            console.log('usePosts useEffect error', e.message);
          }
        })();
      }, [update]);

      const loadMessagesByPostId = async (id) => {
        try {
            const messageData = await doFetch(messageUrl + 'post/' + id);
            return messageData;
        } catch (e) {
            console.log('MessageHooks loadMessageById: ', e.message);
        }
      };

    return {
        loadMessagesByPostId
    };
};

export { useMessage };