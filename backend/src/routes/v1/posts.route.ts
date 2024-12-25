const expressApp = require("express");
const { postsController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");

const router = expressApp.Router();

router
  .route("/")
  .get(catchAsync(postsController.getPosts))
  .post(catchAsync(postsController.createPost));

router
  .route("/:id")
  .get(catchAsync(postsController.getPostById))
  .put(catchAsync(postsController.updatePost))
  .delete(catchAsync(postsController.deletePost));

module.exports = router;
