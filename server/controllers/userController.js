'use strict';
// userController
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get_by_id = async (req, res) => {
  console.log('userController: user_get_bu_id ', req.params);
  const user = await userModel.getUser(req.params.id);
  res.json(user);
}

module.exports = {
  user_list_get,
  user_get_by_id,
  user_create,
  //user_update,
  user_delete
};