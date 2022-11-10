'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// get user for login
const getUserLogin = async (params) => {
    try {
        console.log(params)
        const [rows] = await promisePool.execute(
            'SELECT * FROM user WHERE username = ?', params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
}

module.exports = {getUserLogin}