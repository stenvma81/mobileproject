'use strict'

import {useContext, useEffect, useState} from 'react';
import { doFetch } from '../utils/http';

const useLogin = () => {
    const login = async (userCredentials) => {
      const requestOptions = {
        method: 'POST',
        // mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userCredentials),
      };
      try {
        const loginResponse = await doFetch('http://localhost:${process.env.REACT_APP_SERVER_PORT}/' + 'login', requestOptions);
        return loginResponse;
      } catch (error) {
        console.log('login error', error.message);
      }
    };
    return {login};
  };

  export default useLogin;