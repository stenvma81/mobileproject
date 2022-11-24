import { useState } from 'react';
import { doFetch } from '../utils/http';
import { loginUrl } from '../utils/variables';

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    // sessionStorage is, as the name implies, session-based. if the user logs in & closes the tab, they will have to log in again.
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

const loginUser = async (credentials) => {
  console.log("loginUser: ", credentials);

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };
    const result = await doFetch(loginUrl, options);
    return result;
  } catch (e) {
    console.log('loginUser', e);
  }

  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
  })
    .then(data => data.json())
 }


const useLoginForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    inputs,
  }
};

export {useToken, useLoginForm};