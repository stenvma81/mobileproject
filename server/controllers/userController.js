'use strict';
const userModel = require('../models/userModel');

// get list of all users
const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

// get user by a specific id
const user_get_by_id = async (req, res) => {
  console.log('userController: user_get_bu_id ', req.params);
  const user = await userModel.getUser(req.params.id);
  res.json(user);
}

module.exports = {
  user_list_get,
  user_get_by_id,
};