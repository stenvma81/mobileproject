import React, {useContext} from 'react';
import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';

function togbutton() {

};

const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
  };

export function TestLogin() {
    return (
        <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input type="text" name="uname" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="pass" required />
          </div>
          <div>
            <text>Log in</text>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }