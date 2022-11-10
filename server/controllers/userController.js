'use strict'

const userModel = require('../models/userModel');

const getUserById = async (req, res) => {
    console.log('userController: http get user with param', req.params)
    const user = await userModel.
}