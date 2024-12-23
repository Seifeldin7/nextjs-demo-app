// @ts-expect-error
const express = require('express');
const { postsController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

// @ts-expect-error
const router = express.Router();

router
  .route('/')
  .get(
    // catchAsync(authMiddleware.authenticate),
    catchAsync(postsController.getPosts)
  )
  .post(
    // catchAsync(authMiddleware.authenticate),
    // catchAsync(checkController.createCheck)
  );

module.exports = router;
