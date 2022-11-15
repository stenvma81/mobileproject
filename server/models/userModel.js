'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// get all users
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user');
    return rows;
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

// get user by id
const getUser = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute(
        'SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

// get user for login by employee number
const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM user WHERE employeeid = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserLogin,
};