import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {loginUrl} from '../../utils/variables';
import {useLoginForm, useLogin} from '../../hooks/LoginHooks';

async function loginUser(credentials) {
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

export function Login({ setToken }) {
  const {inputs, handleInputChange} = useLoginForm();
  const loginUser = useLogin();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(inputs);
    setToken(token);
  }

  return(
    <div className="container">
      <h1>Please Log In</h1>
      <p className="description">Property maintenance plugin.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input className="inputfield" onChange={(e) => handleInputChange('username', e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" className="inputfield" onChange={(e) => handleInputChange('password', e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};