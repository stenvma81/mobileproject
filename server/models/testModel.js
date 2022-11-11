const pool = require('../database/db');
const promisePool = pool.promise();

// get all test posts
const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.execute(`SELECT * FROM sample`);
        console.log('testModel getAllPosts: ', rows)
        return rows;
    } catch (e) {
        console.error('testModel:', e.message);
    }
};

module.exports = {getAllPosts};