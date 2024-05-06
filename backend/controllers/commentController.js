const Comment = require('../models/commentModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.addNewComment = catchAsync(async (req, res, next) => {
  const commentData = req.body;

  const newComment = new Comment(commentData);
  await newComment.save();

  if (newComment) {
    res.status(200).json({
      status: 'success',
      message: 'Comment created successfully, waiting for approval',
    });
  } else next(new AppError('Comment creation failed', 401));
});

exports.getCommentsByProduct = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ product_id: req.params.commentID });
  if (comments) {
    res.status(200).json({
      status: 'success',
      comments,
    });
  } else next(new AppError('Nemate nijedan komentar', 404));
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const allComments = await Comment.find({});
  if (allComments.length > 0) {
    res.status(200).json({
      status: 'success',
      allComments,
    });
  } else next(new AppError('Nemate nijedan komentar', 404));
});

exports.changeStatus = catchAsync(async (req, res, next) => {
  const newComment = await Comment.findByIdAndUpdate(req.body.commentID, {
    status: req.body.status,
  });
  if (newComment) {
    res.status(200).json({
      status: 'success',
      message: 'Comment updated successfully',
    });
  } else next(new AppError('Unsuccessful', 401));
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.deleteOne({ _id: req.params.commentID });

  if (comment.acknowledged && comment.deletedCount === 1) {
    return res.status(200).json({
      status: 'success',
      message: 'Comment deleted successfully',
    });
  } else {
    return next(new AppError('Nemate nijedan ovakav komentar', 404));
  }
});
