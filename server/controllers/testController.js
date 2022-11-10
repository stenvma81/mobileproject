const testModel = require('../models/testModel');

const testPost_list_get = async (req, res) => {
    console.log("Fetching test posts");
    try {
        console.log('get all posts from controller', req.query);
        const testPosts = await testModel.getAllPosts();
        res.json(testPosts);
        return;
    } catch (e) {
        console.error('testController', e.message);
    }
};

module.exports = {testPost_list_get};