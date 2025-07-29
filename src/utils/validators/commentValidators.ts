import { body, query, param } from 'express-validator';

export const commentParamsValidator = [
    param('blogId')
    .isMongoId()
    .withMessage('Invalid blog ID'),
    body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
]

export const getCommentValidator = [
    param('blogId')
    .isMongoId()
    .withMessage('Invalid blog ID'),
]

export const deleteCommentValidator = [
    param('commentId')
    .isMongoId()
    .withMessage('Invalid comment ID')
]