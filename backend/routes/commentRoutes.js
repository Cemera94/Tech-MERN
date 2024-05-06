const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router
  .route('/:commentID?')
  .post(commentController.addNewComment)
  .get(commentController.getAllComments)
  .patch(commentController.changeStatus)
  .delete(commentController.deleteComment);

router.route('/filter/:commentID').get(commentController.getCommentsByProduct);

module.exports = router;
