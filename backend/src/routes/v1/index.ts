const express = require('express');
const postsRoute = require('./posts.route');

const postsRouter = express.Router();

postsRouter.use('/posts', postsRoute);

module.exports = postsRouter;
