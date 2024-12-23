// @ts-ignore
const express = require('express');
const postsRoute = require('./posts.route');

// @ts-ignore
const router = express.Router();

router.use('/posts', postsRoute);

module.exports = router;
