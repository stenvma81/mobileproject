import { useState } from 'react';
import {loginUrl} from '../utils/variables';

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
  };
};

const useLogin = () => {
  const loginUser = async (credentials) => {
    console.log("loginUser: ", credentials);

    return fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
      .then(data => data.json())
   }

   return loginUser;
};

const useLoginForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (name, text) => {
    // console.log(name, text);
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
  };
};

export {useToken, useLoginForm, useLogin};